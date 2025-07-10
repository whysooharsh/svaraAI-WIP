import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const router = express.Router();
const ENTRIES_FILE_PATH = path.resolve(__dirname, '../data/entries.json');
const CACHE_DURATION = 5 * 60 * 1000; 

interface Emotions {
  [key: string]: number;
}

interface Turn {
  speaker: "user" | "assistant";
  text: string;
  timestamp: string;
  emotions: Emotions;
}

interface Entry {
  conversation_id: string;
  timestamp_ms: number;
  turns: Turn[];
}

interface CacheData {
  entries: Entry[];
  lastUpdated: number;
  lastModified: number;
}

let entriesCache: CacheData | null = null;

async function getEntriesWithCache(): Promise<Entry[]> {
  try {
    const stats = await fs.stat(ENTRIES_FILE_PATH);
    const fileModified = stats.mtimeMs;

    if (entriesCache && 
        Date.now() - entriesCache.lastUpdated < CACHE_DURATION &&
        entriesCache.lastModified === fileModified) {
      return entriesCache.entries;
    }

    const entriesData = await fs.readFile(ENTRIES_FILE_PATH, 'utf-8');
    const entries = JSON.parse(entriesData);

    entriesCache = {
      entries,
      lastUpdated: Date.now(),
      lastModified: fileModified
    };

    return entries;
  } catch (error) {
    console.error('Error reading entries file:', error);
    if (entriesCache) {
      console.warn('Using cached entries as fallback');
      return entriesCache.entries;
    }
    throw new Error('Unable to read entries data');
  }
}

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { transcript, emoData } = req.body;

    if (!transcript) {
      console.error('No transcript provided');
      res.status(400).json({ error: 'Transcript is required' });
      return;
    }
    const emotionData = emoData || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing from environment variables');
      res.status(500).json({ error: 'Unable to process your request at this time' });
      return;
    }

    const rawPrompt = process.env.GEMINI_PROMPT;
    if (!rawPrompt) {
      console.error('GEMINI_PROMPT is missing from environment variables');
      res.status(500).json({ error: 'Unable to process your request at this time' });
      return;
    }

    const formattedEmoData = Object.entries(emotionData)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([emotion, score]) => `${emotion}: ${((score as number) * 100).toFixed(1)}%`)
      .join('\\n');

    const prompt = rawPrompt
      .replace('{{transcript}}', transcript)
      .replace('{{emoData}}', formattedEmoData);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 100,
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('[Gemini API Error]', data);
      res.status(response.status).json({
        error: 'Unable to process your request at this time'
      });
      return;
    }

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.json({
        response: data.candidates[0].content.parts[0].text,
        emotions: emotionData
      });
    } else {
      console.error('Unexpected Gemini response structure:', data);
      res.status(500).json({ 
        error: 'Unable to process your request at this time'
      });
    }
  } catch (error: any) {
    console.error('[Gemini API Error] An error occurred:', error);
    res.status(500).json({
      error: 'Unable to process your request at this time'
    });
  }
});

export default router;
