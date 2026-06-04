import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authApi";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // Save auth info (simple & backend-friendly)
      login({
          email: data.email,
          role: data.role,
          token: data.access_token,
        });

      // Role-based redirect
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          background-image:
            linear-gradient(
              rgba(15, 23, 42, 0.75),
              rgba(15, 23, 42, 0.75)
            ),
            url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b");

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .login-card {
          width: 360px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        .login-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
          text-align: center;
        }

        .login-subtitle {
          font-size: 12px;
          color: #64748b;
          text-align: center;
          margin-bottom: 20px;
        }

        .login-field {
          margin-bottom: 14px;
        }

        .login-field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .login-field input {
          width: 100%;
          padding: 8px;
          font-size: 13px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }

        .login-field input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .login-error {
          color: #dc2626;
          font-size: 12px;
          margin-bottom: 10px;
          text-align: center;
        }

        .login-btn {
          width: 100%;
          padding: 9px;
          font-size: 13px;
          font-weight: 600;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .login-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 14px;
          font-size: 11px;
          text-align: center;
          color: #64748b;
        }
      `}</style>

      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-title">Sign In</div>
        <div className="login-subtitle">
          Dream Intelligence
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="login-footer">
          Authorized access only
        </div>
      </form>
    </div>
  );
}
