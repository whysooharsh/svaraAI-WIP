import express from 'express';
import { getHumeAccessToken } from '../utils/humeClient';

const router = express.Router();

router.post('/', async (req,res) : Promise<any>=>{
    const { audioUrl } = req.body;
    if (!audioUrl) {
        return res.status(400).json({
            error : 'audioUrl is required'
        });
    }

   
    try {
        new URL(audioUrl);
    } catch {
        return res.status(400).json({
            error: 'Invalid URL format'
        });
    }    try {
        const token = await getHumeAccessToken();
        const response = await fetch('https://api.hume.ai/v0/batch/analyze-url',{
            method : 'POST',
            headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                url : audioUrl,
                models : {
                    language : {},
                    prosody : {}
                },
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Hume API request failed: ${response.status}`);
        }
        
        const result = await response.json();
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error : "analysis failed"
        });
    }
});

export default router;