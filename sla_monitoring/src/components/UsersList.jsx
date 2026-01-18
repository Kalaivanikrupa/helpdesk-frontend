import { useState, useEffect } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend @GetMapping("/api/users") logic connect aagum
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="team-tickets">
      <h2>System Users Management</h2>
      {loading ? (
        <p>Loading database users...</p>
      ) : (
        <table className="tickets-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Domain</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span style={{ 
                    padding: "3px 8px", 
                    borderRadius: "12px", 
                    fontSize: "12px",
                    background: u.role === "ADMIN" ? "#e3f2fd" : "#f1f1f1",
                    color: u.role === "ADMIN" ? "#1976d2" : "#333"
                  }}>
                    {u.role}
                  </span>
                </td>
                <td>{u.domain || "N/A"}</td>
                <td style={{ color: u.available ? "#2e7d32" : "#c62828" }}>
                  {u.available ? "● Active" : "● Offline"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersList;