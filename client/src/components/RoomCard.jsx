import { useNavigate } from "react-router-dom";
import { memo, useState, useEffect } from "react";
import {
  Heart,
  MapPin,
  Star
} from "lucide-react";

import "../styles/components/RoomCard.css";

function RoomCard({ room, isWishlisted, onWishlist }) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  // Reset image loader when image changes
  useEffect(() => {
    setImgLoaded(false);
  }, [room.image]);

  if (!room) return null;

  return (
    <div
      className="room-card"
      onClick={() => navigate(`/room/${room.id}`)}
    >
      {/* IMAGE */}
      <div className="room-img-wrapper">

        {!imgLoaded && <div className="img-skeleton"></div>}

        <img
          src={room.image || "/fallback.webp"}
          alt={room.name || "Room"}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />

        {/* OFFER BADGE */}
        {room.offer && (
          <span className="offer-badge">{room.offer}</span>
        )}
      </div>

      {/* INFO */}
      <div className="room-info">

        {/* HEADER */}
        <div className="room-header">
          <h3>{room.name || "Room"}</h3>

          {/* ❤️ WISHLIST BUTTON */}
          <button
            className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onWishlist && onWishlist(room.id);
            }}
          >
            <Heart
              size={18}
              strokeWidth={2}
              color={isWishlisted ? "#ef4444" : "#9ca3af"}   // ✅ border
              fill={isWishlisted ? "#ef4444" : "none"}       // ✅ fill
            />
          </button>
        </div>

        {/* LOCATION */}
        <p className="location">
          <MapPin size={14} /> {room.location || "Unknown"}
        </p>

        {/* DESCRIPTION */}
        <p className="desc">
          {room.description || "No description available"}
        </p>

        {/* RATING */}
        <div className="rating">
          <Star size={14} /> {room.rating || "4.0"}
        </div>

        {/* PRICE */}
        <div className="price-section">
          <span className="price">₹{room.price || 0}</span>

          {room.originalPrice && (
            <span className="original">
              ₹{room.originalPrice}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          className="view-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/room/${room.id}`);
          }}
        >
          View Details
        </button>

      </div>
    </div>
  );
}

export default memo(RoomCard);