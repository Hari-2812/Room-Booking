import { useState } from "react";
import "../styles/components/FilterSidebar.css";

function FilterSidebar({ onFilter }) {
  const [filters, setFilters] = useState({
    price: 5000,
    rating: 1,
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: Number(e.target.value),
    });
  };

  return (
    <div className="filter-sidebar">

      <h3>Filters</h3>

      <div className="filter-group">
        <label>Max Price: ₹{filters.price}</label>
        <input
          type="range"
          name="price"
          min="1000"
          max="10000"
          value={filters.price}
          onChange={handleChange}
        />
      </div>

      <div className="filter-group">
        <label>Minimum Rating</label>
        <select
          name="rating"
          value={filters.rating}
          onChange={handleChange}
        >
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      <button onClick={() => onFilter(filters)}>
        Apply Filters
      </button>

    </div>
  );
}

export default FilterSidebar;