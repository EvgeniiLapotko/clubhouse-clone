import express from 'express';

import dotenv from 'dotenv';
import user from '../models';

dotenv.config({
  path: 'server/.env',
});

import './core/db';

const app = express();

app.get('/test', async (req, res) => {
  res.send({ test: 'test' });
});

app.get('/auth', (req, res) => {
  res.send({ test: 'auth' });
});

app.listen(3001, () => {
  console.log('SERVER RUN');
});
