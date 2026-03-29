import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Snowflake
} from "lucide-react";

import "../styles/pages/RoomDetails.css";

import hotel1 from "../assets/hotel1.webp";
import hotel2 from "../assets/hotel2.webp";
import hotel3 from "../assets/hotel3.webp";

const rooms = [
  { id: 1, name: "Luxury Room 1", description: "Comfortable room with city view.", price: 2500, location: "Chennai", image: hotel1 },
  { id: 2, name: "Luxury Room 2", description: "Beachside room with sunset view.", price: 3500, location: "Goa", image: hotel2 },
  { id: 3, name: "Luxury Room 3", description: "Peaceful mountain stay.", price: 1800, location: "Ooty", image: hotel3 },
];

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const room = useMemo(() => {
    if (state) return state;
    return rooms.find((r) => r.id === Number(id));
  }, [state, id]);

  const images = [room?.image, hotel1, hotel2];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const [booking, setBooking] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "guests" && value < 1) return;

    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    if (!booking.checkIn || !booking.checkOut) {
      return setError("Select dates");
    }

    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      return setError("Invalid date selection");
    }

    setError("");
    navigate("/booking", { state: { room, booking } });
  };

  if (!room) return <div>Room not found</div>;

  return (
    <div className="room-container">

      {/* 🔥 IMAGE SLIDER */}
      <div className="slider">

        <img src={images[current]} alt="room" />

        {/* ARROWS */}
        <button className="prev" onClick={prevSlide}>‹</button>
        <button className="next" onClick={nextSlide}>›</button>

        {/* DOTS */}
        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={current === i ? "active" : ""}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="room-content">

        {/* LEFT */}
        <div className="room-info">
          <h1>{room.name}</h1>

          <p className="location">
            <MapPin size={16} /> {room.location}
          </p>

          <div className="rating">
            <Star size={16} /> 4.5 (120 reviews)
          </div>

          <p className="desc">{room.description}</p>

          {/* 🔥 SERVICES */}
          <div className="amenities">
            <span><Wifi size={14} /> Free WiFi</span>
            <span><Snowflake size={14} /> AC</span>
            <span><Coffee size={14} /> Breakfast</span>
            <span><Car size={14} /> Parking</span>
          </div>

          {/* 🔥 REVIEWS */}
          <div className="reviews">
            <h3>Guest Reviews</h3>

            <div className="review-card">
              <p>"Amazing stay! Clean rooms and great service."</p>
              <span>- Rahul</span>
            </div>

            <div className="review-card">
              <p>"Loved the location and comfort."</p>
              <span>- Priya</span>
            </div>
          </div>
        </div>

        {/* BOOKING */}
        <div className="booking-box">

          <div className="price">
            ₹{room.price} <span>/ night</span>
          </div>

          <div className="input-box">
            <label>Check-in</label>
            <input type="date" name="checkIn" onChange={handleChange} />
          </div>

          <div className="input-box">
            <label>Check-out</label>
            <input type="date" name="checkOut" onChange={handleChange} />
          </div>

          <div className="input-box">
            <label>Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={booking.guests}
              onChange={handleChange}
            />
          </div>

          <button className="book-btn" onClick={handleBooking}>
            Reserve Now
          </button>

          {error && <p className="error">{error}</p>}
        </div>

      </div>

    </div>
  );
}

export default RoomDetails;