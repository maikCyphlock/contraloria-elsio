import express from 'express';
import cors from 'cors';
import complaintsRouter from './routes/complaints.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/complaints', complaintsRouter);

app.listen(PORT, () => {
  console.log(`Servidor SQLite escuchando en http://localhost:${PORT}`);
});
