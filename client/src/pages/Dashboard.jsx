import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import ChartBox from "../components/Chatbox"; // ✅ ADDED
import "../styles/pages/Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // ✅ ADDED

  useEffect(() => {
    setBookings([
      {
        id: 1,
        hotel: "Luxury Palace",
        location: "Chennai",
        date: "2026-04-01",
        status: "Confirmed",
        price: 5000,
      },
      {
        id: 2,
        hotel: "Sea View Resort",
        location: "Goa",
        date: "2026-04-10",
        status: "Pending",
        price: 8000,
      },
    ]);
  }, []);

  // ✅ SAFE REDUCE
  const totalSpent = bookings.reduce(
    (acc, b) => acc + (b.price || 0),
    0
  );

  return (
    <div className="dashboard-container">

      {/* 🔥 SIDEBAR */}
      <aside className="sidebar">
        <h2>RoomBooking</h2>

        <ul>
          <li className="active">Dashboard</li>

          <li onClick={() => alert("Bookings page coming soon")}>
            Bookings
          </li>

          <li onClick={() => alert("Profile coming soon")}>
            Profile
          </li>

          {/* ✅ BETTER LOGOUT */}
          <li
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login"); // 🔥 FIXED
            }}
          >
            Logout
          </li>
        </ul>
      </aside>

      {/* 🔥 MAIN */}
      <main className="dashboard-main">

        <h1>Dashboard</h1>

        {/* 🔥 STATS */}
        <div className="stats">
          <div className="stat-card">
            <p>Total Bookings</p>
            <h2>{bookings.length}</h2>
          </div>

          <div className="stat-card">
            <p>Total Spent</p>
            <h2>₹{totalSpent}</h2>
          </div>
        </div>

        {/* ✅ ADDED CHART */}
        <ChartBox />

        {/* 🔥 BOOKINGS */}
        <div className="booking-list">

          {bookings.length > 0 ? (
            bookings.map((b) => (
              <div key={b.id} className="booking-card">

                <div>
                  <h3>{b.hotel}</h3>
                  <p>{b.location}</p>
                  <p>{b.date}</p>
                </div>

                <div className="booking-right">
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                  <h4>₹{b.price}</h4>
                </div>

              </div>
            ))
          ) : (
            <p>No bookings yet</p>
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;