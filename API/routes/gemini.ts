import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { transcript, emoData } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing transcript' });
  }

  if (!emoData) {
    return res.status(400).json({ error: 'Missing emotional data' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Gemini API Key' });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You're a compassionate therapist. Based on this user's message: "${transcript}" and their emotional signals: ${JSON.stringify(
                    emoData
                  )}, respond with empathy, insight, and end with a short emotional summary.`,
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
      return res.status(response.status).json({ error: 'Gemini API request failed' });
    }

    return res.status(200).json(data);
  } catch {
    console.error('[Gemini API Error] An error occurred while processing the Gemini API request.');
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});

export default router;
