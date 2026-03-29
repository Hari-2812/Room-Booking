import Subscriber from "../models/Subscriber.js";

export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return res.json({ message: "Already subscribed" });
    }

    await Subscriber.create({ email });

    res.json({ message: "Subscribed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};