import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

import "../styles/components/Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.location.href = "mailto:support@roombooking.com";
  };

  const handleCallClick = () => {
    window.location.href = "tel:+919876543210";
  };

  return (
    <footer className="footer">

      {/* 🔥 CTA */}
      <div className="footer-cta">
        <h2>Find your perfect stay today</h2>
        <p>Book hotels at the best prices with ease</p>

        <div className="cta-box">
          <Mail size={16} />
          <input placeholder="Enter your email" />
          <button onClick={() => alert("Subscribed!")}>
            Get Started
          </button>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="footer-main">
        <div className="footer-container">

          <div className="footer-grid">

            {/* ABOUT */}
            <div className="footer-about">
              <h3>RoomBooking</h3>
              <p>
                Discover and book the best hotels with ease.
                Trusted platform for seamless travel experiences.
              </p>

              <div className="contact-info">
                <p onClick={handleEmailClick} className="clickable">
                  <Mail size={14} /> support@roombooking.com
                </p>

                <p onClick={handleCallClick} className="clickable">
                  <Phone size={14} /> +91 98765 43210
                </p>
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              <h4>Product</h4>
              <Link to="/">Home</Link>
              <Link to="/rooms">Rooms</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>

            {/* COMPANY */}
            <div>
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <span onClick={() => navigate("/contact")} className="link-click">
                Contact
              </span>
              <span onClick={() => navigate("/help")} className="link-click">
                Support
              </span>
            </div>

            {/* LEGAL */}
            <div>
              <h4>Legal</h4>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>

            {/* SOCIAL */}
            <div className="footer-social">
              <h4>Follow</h4>

              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>

                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>

                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

          </div>

          <div className="footer-bottom">
            © 2026 RoomBooking. All rights reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;