import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    ...req.body,
  });

  res.json(booking);
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("room");
  res.json(bookings);
};