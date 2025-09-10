import { useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000";
import "./login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/auth/login`, formData);
      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("role", role);

      if (role === "supervisor") {
        window.location.href = "/super";
      } else if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "student") {
        window.location.href = "/student";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label className="login-label">Email</label>
        <input
          type="email"
          name="email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          name="password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
