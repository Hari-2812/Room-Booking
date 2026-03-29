import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import "../styles/pages/Wishlist.css"; // reuse grid

// SAME DATA (temporary)
const roomsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Luxury Room ${i + 1}`,
  location: ["Chennai", "Goa", "Ooty"][i % 3],
  description: "Spacious room with modern amenities.",
  price: 2000 + i * 300,
  originalPrice: 3000 + i * 400,
  rating: (Math.random() * 2 + 3).toFixed(1),
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
}));

function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistRooms, setWishlistRooms] = useState([]);

  // 🔥 LOAD WISHLIST
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(saved);
  }, []);

  // 🔥 FILTER ROOMS
  useEffect(() => {
    const filtered = roomsData.filter((room) =>
      wishlistIds.includes(room.id)
    );
    setWishlistRooms(filtered);
  }, [wishlistIds]);

  // ❤️ REMOVE
  const removeFromWishlist = (id) => {
    const updated = wishlistIds.filter((item) => item !== id);

    setWishlistIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="rooms-page">

      <h1>Your Wishlist ❤️</h1>

      <div className="room-grid">
        {wishlistRooms.length > 0 ? (
          wishlistRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isWishlisted={true}
              onWishlist={removeFromWishlist}
            />
          ))
        ) : (
          <div className="empty-state">
            <h2>No saved rooms 😔</h2>
            <p>Start adding rooms to wishlist</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Wishlist;