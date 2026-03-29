import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Settings
} from "lucide-react";

import "../styles/components/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);
  useEffect(() => {
    const updateWishlist = () => {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(saved.length);
    };

    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <h2 className="logo" onClick={() => navigate("/")}>
        StayFinder
      </h2>

      <div className="nav-links">

        <NavLink to="/" className="link">Home</NavLink>
        <NavLink to="/rooms" className="link">Rooms</NavLink>

        {/* ❤️ CLEAN ICON (NO EMOJI) */}
        <NavLink to="/wishlist" className="link icon-link">
          <Heart size={18} />
          <span>Wishlist</span>

          {wishlistCount > 0 && (
            <span className="wishlist-count">{wishlistCount}</span>
          )}
        </NavLink>

        <NavLink to="/dashboard" className="link icon-link">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* AUTH */}
        {!user ? (
          <button
            type="button"   // ✅ VERY IMPORTANT
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <div className="profile" ref={dropdownRef}>

            {/* AVATAR */}
            <div
              className="avatar"
              onClick={() => setOpen(!open)}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="dropdown">

                <div className="profile-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>

                <hr />

                <p onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard size={16} /> My Bookings
                </p>

                <p>
                  <Settings size={16} /> Settings
                </p>

                <p className="logout" onClick={handleLogout}>
                  <LogOut size={16} /> Logout
                </p>

              </div>
            )}

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;