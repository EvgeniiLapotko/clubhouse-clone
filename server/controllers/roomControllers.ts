import express from 'express';
import { Room } from '../../models';

class RoomController {
  async getRooms(req: express.Request, res: express.Response) {
    try {
      const items = await Room.findAll();
      res.status(200).json(items);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
  async createRoom(req: express.Request, res: express.Response) {
    try {
      const { body } = req;
      const room = await Room.create({
        title: body.title,
        type: body.type,
        listenersCount: 0,
        speackers: {
          avatars: ['', ''],
          count: 0,
        },
      });
      res.status(200).json(room);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
  async getOne(req: express.Request, res: express.Response) {
    try {
      const room = await Room.findOne({ where: { id: +req.params.id } });
      res.status(200).json(room);
    } catch (e) {
      res.status(500).json({ message: e, text: 'room not found' });
    }
  }
  async deleteRoom(req: express.Request, res: express.Response) {
    try {
      const room = await Room.destroy({ where: { id: +req.params.id } });
      res.status(200).json(room);
    } catch (e) {
      res.status(500).json({ message: e, text: 'room not delete' });
    }
  }
}

export default new RoomController();
