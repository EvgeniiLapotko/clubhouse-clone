import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import user from '../models';

dotenv.config({
  path: 'server/.env',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/').pop());
  },
});

const upload = multer({
  storage,
});

import './core/db';

const app = express();

app.use(cors());

app.get('/test', async (req, res) => {
  res.send({ test: 'test' });
});

app.get('/auth', (req, res) => {
  res.send({ test: 'auth' });
});

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`,
  });
});

app.listen(3001, () => {
  console.log('SERVER RUN');
});
