import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SearchBar.css";


function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [error, setError] = useState("");

  /* 🔥 HANDLE INPUT CHANGE (OPTIMIZED) */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "guests" && value < 1) return;

    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /* 🔥 VALIDATION + NAVIGATION */
  const handleSearch = useCallback(() => {
    if (!search.location.trim()) {
      return setError("Enter location");
    }

    if (!search.checkIn || !search.checkOut) {
      return setError("Select dates");
    }

    if (new Date(search.checkOut) <= new Date(search.checkIn)) {
      return setError("Check-out must be after check-in");
    }

    setError("");

    navigate("/rooms", { state: search });
  }, [search, navigate]);

  return (
    <div className="search-wrapper">

      <div className="search-bar">

        {/* 📍 LOCATION */}
        <div className="search-item">
          <span aria-hidden="true">📍</span>
          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Where are you going?"
              value={search.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 📅 CHECK-IN */}
        <div className="search-item">
          <span aria-hidden="true">📅</span>
          <div>
            <label htmlFor="checkIn">Check-in</label>
            <input
              id="checkIn"
              type="date"
              name="checkIn"
              value={search.checkIn}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 📅 CHECK-OUT */}
        <div className="search-item">
          <span aria-hidden="true">📅</span>
          <div>
            <label htmlFor="checkOut">Check-out</label>
            <input
              id="checkOut"
              type="date"
              name="checkOut"
              value={search.checkOut}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 👥 GUESTS */}
        <div className="search-item">
          <span aria-hidden="true">👤</span>
          <div>
            <label htmlFor="guests">Guests</label>
            <input
              id="guests"
              type="number"
              name="guests"
              min="1"
              value={search.guests}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔍 BUTTON */}
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>

      </div>

      {/* 🔥 ERROR */}
      {error && <p className="search-error">{error}</p>}
    </div>
  );
}

export default SearchBar;