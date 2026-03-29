import { memo } from "react";
import SearchBar from "../components/SearchBar";
import RoomCard from "../components/RoomCard";
import "../styles/pages/Home.css";

/* LOCAL IMAGES */
import hotel1 from "../assets/hotel1.webp";
import hotel2 from "../assets/hotel2.webp";
import hotel3 from "../assets/hotel3.webp";

/* DATA */
const dummyHotels = [
  {
    id: 1,
    name: "Luxury Palace",
    location: "Chennai",
    price: 2500,
    originalPrice: 3500,
    rating: 4.5,
    offer: "20% OFF",
    description: "Premium stay with city view and modern facilities",
    image: hotel1,
  },
  {
    id: 2,
    name: "Sea View Resort",
    location: "Goa",
    price: 4000,
    originalPrice: 5200,
    rating: 4.7,
    offer: "30% OFF",
    description: "Enjoy beachside luxury and sunset views",
    image: hotel2,
  },
  {
    id: 3,
    name: "Mountain Stay",
    location: "Ooty",
    price: 1800,
    originalPrice: 2500,
    rating: 4.3,
    offer: null,
    description: "Peaceful stay surrounded by nature",
    image: hotel3,
  },
];

function Home() {
  return (
    <div className="home">

      {/* 🔥 HERO */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Luxury hotels, best prices, instant booking</p>
          <SearchBar />
        </div>
      </div>

      {/* 🔥 FEATURED HOTELS */}
      <section className="section">
        <h2>Featured Hotels</h2>

        <div className="hotel-grid">
          {dummyHotels.map((hotel) => (
            <RoomCard key={hotel.id} room={hotel} />
          ))}
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="section why">
        <h2>Why Choose Us</h2>

        <div className="features">
          <div className="feature-card">💰 Best Prices</div>
          <div className="feature-card">⚡ Instant Booking</div>
          <div className="feature-card">⭐ Top Rated Hotels</div>
        </div>
      </section>

    </div>
  );
}

export default memo(Home);