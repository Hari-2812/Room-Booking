import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/pages/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      return setError("Enter a valid email");
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT */}
      <div className="auth-left">
        <div className="auth-card">

          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <button disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="switch">
              Don’t have an account? <Link to="/register">Sign up</Link>
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="overlay">
          <h2>RoomBooking</h2>
          <p>Book your perfect stay with ease</p>
        </div>
      </div>

    </div>
  );
}

export default Login;