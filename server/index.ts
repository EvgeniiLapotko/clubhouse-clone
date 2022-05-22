import express from 'express';
require('express-async-errors');
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({
  path: 'server/.env',
});

import './core/db';
import { auth, authActivated } from './controllers/authControllers';
import RoomControllers from './controllers/roomControllers';
import { uploadFile } from './controllers/uploadController';
import { upload } from './untils/multerStorage';
import { authenticationMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', async (req, res) => {
  res.send(false);
});

app.post('/upload', upload.single('avatar'), uploadFile);

app.get('/rooms', RoomControllers.getRooms);
app.get('/rooms/:id', RoomControllers.getOne);
app.post('/rooms', RoomControllers.createRoom);
app.delete('/rooms/:id', RoomControllers.deleteRoom);

app.post('/auth', auth);
app.post('/auth/activated', authActivated);

app.get('/auth/me', authenticationMiddleware, async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log('SERVER RUN:3001');
});
