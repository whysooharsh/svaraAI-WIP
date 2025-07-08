import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const FILE_PATH = path.resolve(__dirname, "../data/entries.json");

export const saveEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { transcript, emotions, geminiReply } = req.body;
    
    const entry = {
      id: crypto.randomUUID(),
      timeStamp: Date.now(),
      transcript,
      emotions,
      geminiReply,
    };

    console.log("Writing to:", FILE_PATH);
    
    let curr: any[] = [];
    
    try {
      const file = await fs.readFile(FILE_PATH, "utf-8");
      curr = JSON.parse(file);
    } catch {
      curr = [];
    }
    
    curr.push(entry);
    
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(curr, null, 2));
    
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving entry:", err);
    res.status(500).json({ error: "Failed to save entry" });
  }
};