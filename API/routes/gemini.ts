import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { transcript, emoData } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing transcript' });
  }

  if (!emoData || typeof emoData !== 'object') {
    return res.status(400).json({ error: 'Invalid or missing emotional data' });
  }
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
-   
+   console.error('GEMINI_API_KEY is missing from environment variables');    return res.status(500).json({ error: 'Missing Gemini API Key' });
  }

const rawPrompt = process.env.GEMINI_PROMPT;
const prompt = rawPrompt
  ?.replace('{{transcript}}', transcript)
  .replace('{{emoData}}', JSON.stringify(emoData));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: prompt
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('[Gemini API Error]', data);
      return res.status(response.status).json({ error: 'Gemini API request failed', details: data });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('[Gemini API Error] An error occurred while processing the Gemini API request.', error);
    return res.status(500).json({ error: 'An unexpected error occurred.', details: error.message });
  }
});

export default router;
