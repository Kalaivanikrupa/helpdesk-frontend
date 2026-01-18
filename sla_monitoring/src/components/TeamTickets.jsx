import { useState, useEffect } from "react";

function TeamTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching Logic (Using your domain specific path)
  const fetchData = async () => {
    if (!user || !user.domain) return;

    try {
      setLoading(true);
      // Directly fetching by domain (Endpoint #3)
      const ticketRes = await fetch(`http://localhost:8080/api/tickets/domain/${user.domain}`);
      const ticketData = await ticketRes.json();
      setTickets(ticketData);

      // Available supporters
      const supportRes = await fetch(`http://localhost:8080/api/users/available-support/${user.domain}`);
      const supportData = await supportRes.json();
      setSupporters(supportData);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // 2. FIXED Logic: Manual Assign & Decline Transfer
  const assignTicket = async (ticketId, supporterName) => {
    if (!supporterName) return;

    try {
      // Backend-la '/assign' endpoint illathathala, we use '/manager-action'
      // action=APPROVE helps in both fresh assign and transfer after decline.
      const url = `http://localhost:8080/api/tickets/${ticketId}/manager-action?action=APPROVE&newSupport=${supporterName}`;
      
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        alert(`Successfully assigned to ${supporterName}!`);
        fetchData(); 
      } else {
        alert("Assignment failed. Server-la logic check pannu da.");
      }
    } catch (err) {
      alert("Network error! Check backend server.");
    }
  };

  if (!user || !user.domain) {
    return <div style={{ padding: "20px" }}>Loading manager details...</div>;
  }

  return (
    <div className="team-tickets" style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
        <h2>Team Tickets</h2>
        <span style={{ background: "#e1f5fe", padding: "5px 15px", borderRadius: "15px", fontWeight: "bold", color: "#0288d1" }}>
          Domain: {user.domain}
        </span>
      </div>

      {loading ? (
        <p>Fetching tickets from server...</p>
      ) : (
        <table className="tickets-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Title</th>
              <th style={{ padding: "12px" }}>Priority</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Assigned To</th>
              <th style={{ padding: "12px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#888" }}>No tickets found.</td></tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>#{t.id}</td>
                  <td style={{ padding: "12px" }}>{t.title}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ 
                      padding: "4px 8px", borderRadius: "4px", fontSize: "12px", 
                      background: t.priority === "High" ? "#ffebee" : "#e8f5e9",
                      color: t.priority === "High" ? "#c62828" : "#2e7d32"
                    }}>
                      {t.priority}
                    </span>
                  </td>
                  <td style={{ padding: "12px", color: t.status === "Declined" ? "red" : "black" }}>
                    {t.status}
                  </td>
                  <td style={{ padding: "12px" }}>{t.assignedTo || "Not Assigned"}</td>
                  <td style={{ padding: "12px" }}>
                    {t.status !== "Resolved" ? (
                      <select 
                        defaultValue="" 
                        onChange={(e) => assignTicket(t.id, e.target.value)}
                        style={{ padding: "6px", borderRadius: "4px", border: t.status === "Declined" ? "2px solid red" : "1px solid #ccc" }}
                      >
                        <option value="" disabled>Select Support</option>
                        {supporters
                          /* 🔹 MUKKIYAM: Decline panna person-ah list-la irundhu thukkirom */
                          .filter(s => s.name !== t.assignedTo)
                          .map(s => (
                            <option key={s.name} value={s.name}>{s.name}</option>
                          ))
                        }
                      </select>
                    ) : (
                      <span style={{ color: "#28a745", fontWeight: "bold" }}>✔ {t.status}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeamTickets;