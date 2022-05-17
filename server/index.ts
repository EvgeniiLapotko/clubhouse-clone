import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from '../models';

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
import { createJwtToken } from './untils/createJWTToken';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', async (req, res) => {
  res.send({ test: 'test' });
});

app.post('/auth', async (req, res) => {
  const user = await User.findOne({ where: { phone: req.body.phone } });
  if (!user) {
    const user = await User.create({
      fullName: 'Anonymous',
      isActive: false,
      phone: req.body.phone,
      avatar: '',
    });
    return res.status(200).json(user);
  } else {
    return res.status(200).json(user);
  }
});

app.post('/auth/activated', async (req, res) => {
  const user = await User.findOne({ where: { phone: req.body.phone } });
  if (user) {
    user.isActive = true;
    user.avatar = req.body.avatar;
    await user.save();
    const token = createJwtToken(user);
    res.status(200).send({ ...user, token });
  }
});

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({
    url: `/avatars/${req.file.filename}`,
  });
});

app.listen(3001, () => {
  console.log('SERVER RUN');
});
