import express from 'express';
import dotenv from 'dotenv';
import geminiRouter from './routes/gemini';
import humeRouter from './routes/hume';
import cors from 'cors';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/gemini', geminiRouter);
app.use('/api/hume', humeRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
}).on('error', (err: Error) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
