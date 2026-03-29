import { useState, useEffect, useMemo } from "react";
import RoomCard from "../components/RoomCard";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/pages/Rooms.css";

/* 🔥 LOCAL IMAGES (IMPORTANT) */
import hotel1 from "../assets/hotel1.webp";
import hotel2 from "../assets/hotel2.webp";
import hotel3 from "../assets/hotel3.webp";

/* 🔥 OPTIMIZED DATA */
const roomsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Luxury Room ${i + 1}`,
  location: ["Chennai", "Goa", "Ooty"][i % 3],
  description: "Spacious room with modern amenities and beautiful view.",
  price: 2000 + i * 300,
  originalPrice: 3000 + i * 400,
  rating: 4 + (i % 2), // ✅ removed Math.random
  image: [hotel1, hotel2, hotel3][i % 3], // ✅ local images
  offer: i % 2 === 0 ? "20% OFF" : null,
  popular: i % 3 === 0,
}));

function Rooms() {
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  const [sort, setSort] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // 🔥 LOAD WISHLIST
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // 🔥 SORT (MEMOIZED)
  const sortedRooms = useMemo(() => {
    let sorted = [...filteredRooms];

    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [filteredRooms, sort]);

  // 🔥 FILTER
  const handleFilter = (filters) => {
    let result = roomsData.filter(
      (room) =>
        room.price <= filters.price && room.rating >= filters.rating
    );

    setFilteredRooms(result);
    setPage(1);
  };

  // 🔥 WISHLIST
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      let updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem("wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlistUpdated"));

      return updated;
    });
  };

  // 🔥 PAGINATION
  const start = (page - 1) * itemsPerPage;
  const paginatedRooms = sortedRooms.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);

  return (
    <div className="rooms-page">

      <h1>Explore Our Rooms ✨</h1>

      <div className="top-bar">
        <p>{sortedRooms.length} stays found</p>

        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="default">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="rooms-layout">

        <FilterSidebar onFilter={handleFilter} />

        <div className="room-grid">
          {paginatedRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isWishlisted={wishlist.includes(room.id)}
              onWishlist={toggleWishlist}
            />
          ))}
        </div>

      </div>

      {/* 🔥 PAGINATION */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Rooms;