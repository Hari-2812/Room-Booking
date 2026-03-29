import { useState } from "react";
import "../styles/pages/Booking.css";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pricePerNight = 2500;
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "guests" && value < 1) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;

    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);

    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = getNights();
  const totalPrice = nights * pricePerNight;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return setError("All fields are required");
    }

    if (!form.email.includes("@")) {
      return setError("Enter valid email");
    }

    if (nights <= 0) {
      return setError("Invalid dates selected");
    }

    setError("");
    setLoading(true);

    // 🔥 simulate API
    setTimeout(() => {
      console.log("Booking Data:", { ...form, totalPrice });
      setLoading(false);
      alert("Booking successful 🎉");
    }, 1500);
  };

  return (
    <div className="booking-container">

      <div className="booking-form-section">
        <h1>Complete Your Booking</h1>

        <form onSubmit={handleSubmit} className="booking-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <div className="date-group">
            <input
              type="date"
              name="checkIn"
              min={today}
              value={form.checkIn}
              onChange={handleChange}
            />

            <input
              type="date"
              name="checkOut"
              min={form.checkIn || today}
              value={form.checkOut}
              onChange={handleChange}
            />
          </div>

          <input
            type="number"
            name="guests"
            min="1"
            max="5"
            value={form.guests}
            onChange={handleChange}
          />

          <button className="btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      <div className="booking-summary">
        <h2>Booking Summary</h2>

        <p>Price / night: ₹{pricePerNight}</p>
        <p>Nights: {nights}</p>
        <p>Guests: {form.guests}</p>

        <h3>Total: ₹{totalPrice}</h3>
      </div>

    </div>
  );
}

export default Booking;