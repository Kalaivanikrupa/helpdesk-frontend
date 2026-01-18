import { useState, useEffect } from "react";

function MyTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch tickets from Backend
  const fetchMyTickets = async () => {
    if (!user || !user.name) return;
    
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/tickets");
      const data = await res.json();
      
      // LOGIC: Login panni irukura user create panna tickets-ah mattum filter panrom
      const filtered = data.filter(t => t.createdBy === user.name);
      setTickets(filtered);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching my tickets:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, [user]);

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Submitted Tickets</h2>
        <button 
          onClick={fetchMyTickets} 
          style={{ padding: "5px 15px", cursor: "pointer", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          🔄 Refresh Status
        </button>
      </div>

      {loading ? (
        <p>Loading your tickets...</p>
      ) : tickets.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
          <p>You haven't created any tickets yet.</p>
        </div>
      ) : (
        <table className="tickets-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>ID</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Title</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Priority</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Status</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Assigned To</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Domain</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>#{t.id}</td>
                <td style={{ padding: "12px" }}>
                  <strong>{t.title}</strong>
                  <div style={{ fontSize: "12px", color: "#666" }}>{t.description}</div>
                </td>
                <td style={{ padding: "12px" }}>
                  <span className={`priority-badge ${t.priority?.toLowerCase()}`}>
                    {t.priority}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor: t.status === "Resolved" ? "#d4edda" : "#fff3cd",
                    color: t.status === "Resolved" ? "#155724" : "#856404"
                  }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "#555" }}>
                  {t.assignedTo || "🔍 Searching for Support..."}
                </td>
                <td style={{ padding: "12px" }}>{t.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyTickets;