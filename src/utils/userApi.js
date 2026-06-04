import { API_BASE } from "../config/api";

function authHeader() {
  const auth = JSON.parse(localStorage.getItem("AUTH_USER"));
  return {
    Authorization: `Bearer ${auth?.token}`,
    "Content-Type": "application/json",
  };
}

export async function fetchUserStats() {
  const res = await fetch(`${API_BASE}/user/me`, {
    headers: authHeader(),
  });
  return res.json();
}

export async function fetchProfileRequests() {
  const res = await fetch(`${API_BASE}/requests/my`, {
    headers: authHeader(),
  });
  return res.json();
}

export async function createProfileRequest(name, extraInfo) {
  const res = await fetch(`${API_BASE}/requests`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ name, extrainfo: extraInfo }),
  });
  return res.json();
}
