import React, { useEffect, useState } from "react";

const API_BASE = "https://dashboard-backend-api-ocr5.onrender.com";

export default function AdminPage() {
  const token = JSON.parse(localStorage.getItem("AUTH_USER"))?.token;

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "user",
    total_searches_allowed: 5,
  });

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    fetchUsers();
    fetchRequests();
  }, []);

  async function fetchUsers() {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: authHeader });
    setUsers(await res.json());
  }

  async function fetchRequests() {
    const res = await fetch(`${API_BASE}/admin/requests`, { headers: authHeader });
    setRequests(await res.json());
  }

  /* ================= CREATE USER ================= */

  async function createUser(e) {
    e.preventDefault();

    await fetch(`${API_BASE}/admin/users`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify(newUser),
    });

    setNewUser({
      email: "",
      password: "",
      role: "user",
      total_searches_allowed: 5,
    });

    fetchUsers();
  }

  /* ================= UPDATE ================= */

  async function updateUser(userId, payload) {
    await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify(payload),
    });
    fetchUsers();
  }

  async function updateRequest(requestId, payload) {
    await fetch(`${API_BASE}/admin/requests/${requestId}`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify(payload),
    });
    fetchRequests();
  }

  /* ================= DELETE ================= */

  async function deleteUser(userId) {
    if (!window.confirm("Delete user and ALL their requests?")) return;

    await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: "DELETE",
      headers: authHeader,
    });

    fetchUsers();
    fetchRequests();
  }

  async function deleteRequest(requestId) {
    if (!window.confirm("Delete this request?")) return;

    await fetch(`${API_BASE}/admin/requests/${requestId}`, {
      method: "DELETE",
      headers: authHeader,
    });

    fetchRequests();
  }

  const formatDate = (v) => (v ? new Date(v).toLocaleString() : "NA");

  /* ================= UI ================= */

  return (
    <div className="admin-wrapper">
      <style>{`
        .admin-wrapper {
          padding: 20px;
          font-family: system-ui;
          background: #f8fafc;
          min-height: calc(100vh - 48px);
          color: #000;
        }
        h1 { margin-bottom: 4px; }
        h2 { margin: 16px 0 8px; font-size: 16px; }
        .card {
          background: #fff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 14px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        th, td {
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
          text-align: left;
        }
        th { background: #f1f5f9; }
        input, select {
          padding: 6px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 12px;
        }
        button {
          padding: 6px 10px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .danger { background: #dc2626; }
        .secondary { background: #64748b; }
        .form-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }
        .badge {
          padding: 2px 6px;
          font-size: 11px;
          border-radius: 4px;
          background: #e5e7eb;
        }
        .actions {
          display: flex;
          gap: 6px;
        }
      `}</style>

      <h1>Admin Dashboard</h1>
      <p>System administration & request handling</p>

      {/* ================= CREATE USER ================= */}
      <div className="card">
        <h2>Create User</h2>
        <form onSubmit={createUser} className="form-row">
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Search Limit"
            value={newUser.total_searches_allowed}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                total_searches_allowed: Number(e.target.value),
              })
            }
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>

      {/* ================= USERS ================= */}
      <div className="card">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
              <th>Used</th>
              <th>Remaining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => updateUser(u.id, { role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <select
                    value={u.is_active ? 1 : 0}
                    onChange={(e) =>
                      updateUser(u.id, { is_active: Number(e.target.value) })
                    }
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </td>
                <td>{u.total_searches_used}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={u.total_searches_allowed}
                    onBlur={(e) =>
                      updateUser(u.id, {
                        total_searches_allowed: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td className="actions">
                  <span className="badge">Auto‑saved</span>
                  <button
                    className="danger"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= REQUESTS ================= */}
      <div className="card">
        <h2>Profile Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Data</th>
              <th>User</th>
              <th>Status</th>
              <th>Profile ID</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.extrainfo}</td>
                <td>{r.user_id}</td>
                <td>
                  <select
                    defaultValue={r.status}
                    onChange={(e) =>
                      updateRequest(r.id, { status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <input
                    placeholder="profile_id"
                    defaultValue={r.profile_id || ""}
                    onBlur={(e) =>
                      updateRequest(r.id, {
                        profile_id: e.target.value || null,
                      })
                    }
                  />
                </td>
                <td>{formatDate(r.requested_at)}</td>
                <td className="actions">
                  <button
                    className="secondary"
                    onClick={() =>
                      window.open(`/data?request_id=${r.id}`, "_blank")
                    }
                  >
                    Open Data
                  </button>
                  <button
                    className="danger"
                    onClick={() => deleteRequest(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
