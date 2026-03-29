import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

export default mongoose.model("Room", roomSchema);