import type { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../data/entries.json");

export const getEntries = async (_ : Request, res: Response) => {
    try {
        const file = await fs.readFile(FILE_PATH, "utf-8");
        const data = JSON.parse(file);
        return res.status(200).json(data);    } catch(err){
        console.log("unable to read : ", err);
        return res.status(500).json({
            error : "unable to read entries"
        });
    }
};