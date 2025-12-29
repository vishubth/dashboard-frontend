// src/services/authApi.js

const API_BASE = "https://dashboard-backend-api-ocr5.onrender.com"; // change if needed

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Login failed");
  }

  return res.json(); 
  /*
    Expected FastAPI response shape:
    {
      "email": "user@example.com",
      "role": "user" | "admin",
      "access_token": "jwt-token"
    }
  */
}
