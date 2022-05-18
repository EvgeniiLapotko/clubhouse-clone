import express from 'express';
import { createJwtToken } from '../untils/createJWTToken';
import { User } from '../../models';

export const auth = async (req: express.Request, res: express.Response) => {
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
    const token = createJwtToken(user);
    user.token = token;
    res.status(200).json(user);
  }
};

export const authActivated = async (req: express.Request, res: express.Response) => {
  const user = await User.findOne({ where: { phone: req.body.phone } });
  if (user) {
    user.isActive = true;
    user.avatar = req.body.avatar;
    user.fullName = req.body.fullName;
    await user.save();
    const token = createJwtToken(user);
    res.status(200).send({ ...user, token });
  }
};
