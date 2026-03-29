import Room from "../models/Room.js";

export const getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

export const getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.json(room);
};