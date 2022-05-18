import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({
  path: 'server/.env',
});

import './core/db';
import { auth, authActivated } from './controllers/authControllers';
import { uploadFile } from './controllers/uploadController';
import { upload } from './untils/multerStorage';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', async (req, res) => {
  res.send(false);
});

app.get('/auth/me', async (req, res) => {
  res.send({ test: 'test' });
});

app.post('/upload', upload.single('avatar'), uploadFile);

app.post('/auth', auth);
app.post('/auth/activated', authActivated);

app.listen(3001, () => {
  console.log('SERVER RUN:3001');
});
