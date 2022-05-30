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
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

const rooms: Record<string, any> = {};

io.on('connection', (socket) => {
  console.log('socket connection', socket.id);

  socket.on('CLIENT:ROOMS/USER_JOIN', ({ roomId, userData }) => {
    console.log('user connect to room', roomId);
    rooms[socket.id] = { roomId, user: userData };
    socket.join(`rooms/${roomId}`);
    io.in(`rooms/${roomId}`).emit(
      'SERVER:ROOMS/JOINED',
      Object.values(rooms)
        .filter((obj) => obj.roomId === roomId)
        .map((obj) => obj.user)
    );
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    const { roomId = '', user } = rooms[socket.id];
    socket.to(`rooms/${roomId}`).emit('SERVER:ROOMS/LEAVE', user);
    delete rooms[socket.id];
  });
});

app.get('/test', async (req, res) => {
  res.send(false);
});

app.post('/upload', upload.single('avatar'), uploadFile);

app.get('/rooms', RoomControllers.getRooms);
app.get('/rooms/:id', RoomControllers.getOne);
app.post('/rooms', RoomControllers.createRoom);
app.patch('/rooms', RoomControllers.updateRoom);
app.delete('/rooms/:id', RoomControllers.deleteRoom);

app.post('/auth', auth);
app.post('/auth/activated', authActivated);

app.get('/auth/me', authenticationMiddleware, async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});

app.use(errorHandler);

server.listen(3001, () => {
  console.log('SERVER RUN:3001');
});
