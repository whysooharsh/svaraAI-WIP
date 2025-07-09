import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const FILE_PATH = path.resolve(__dirname, "../data/entries.json");
const MAX_ENTRIES = 20;

interface EmotionScore {
  emotion: string;
  score: number;
}

interface Message {
  type: string;
  content: string;
  emotions: EmotionScore[];
  timestamp: string;
}

interface Entry {
  id: string;
  timestamp: number;
  messages: Message[];
}

function getTop3Emotions(scores: Record<string, number>): EmotionScore[] {
  return Object.entries(scores)
    .map(([emotion, score]) => ({ emotion, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function createMessageId(message: any): string {
  return `${message.receivedAt}-${message.message?.content || ''}`;
}

export const saveEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages format" });
      return;
    }

    const processedMessages = messages
      .filter((msg: any) => msg.type === "user_message" || msg.type === "assistant_message")
      .map((msg: any) => {
        const emotions = msg.models?.prosody?.scores 
          ? getTop3Emotions(msg.models.prosody.scores)
          : [];

        return {
          type: msg.type,
          content: msg.message.content,
          emotions,
          timestamp: msg.receivedAt
        };
      });

    if (processedMessages.length > 0) {
      let entries: Entry[] = [];
      try {
        const file = await fs.readFile(FILE_PATH, "utf-8");
        entries = JSON.parse(file);
      } catch {
        entries = [];
      }

      const existingMessageIds = new Set(
        entries.flatMap(entry => 
          entry.messages.map(msg => `${msg.timestamp}-${msg.content}`)
        )
      );

      const newMessages = processedMessages.filter(msg => 
        !existingMessageIds.has(`${msg.timestamp}-${msg.content}`)
      );

      if (newMessages.length > 0) {
        const entry: Entry = {
          id: randomUUID(),
          timestamp: Date.now(),
          messages: newMessages
        };

        entries = [...entries.slice(-MAX_ENTRIES + 1), entry];
        
        await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
        await fs.writeFile(FILE_PATH, JSON.stringify(entries, null, 2));
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(500).json({ error: "Failed to save entry" });
  }
};
