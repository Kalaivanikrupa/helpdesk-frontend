import { useState, useEffect } from "react";

function EscalatedTickets({ user }) {
  const [escalated, setEscalated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscalated = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tickets");
        const data = await res.json();
        
        // Backend Logic: Status 'Escalated' and match Manager's domain
        const filtered = data.filter(t => 
          t.status === "Escalated" && 
          t.domain.toLowerCase() === user.domain.toLowerCase()
        );
        setEscalated(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Escalated fetch error", err);
        setLoading(false);
      }
    };
    if(user) fetchEscalated();
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>🚨 Escalated Tickets (SLA Breached)</h2>
      {loading ? <p>Checking for breaches...</p> : (
        <table className="tickets-table">
          <thead>
            <tr style={{ background: "#f8d7da" }}>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>Alert Reason</th>
            </tr>
          </thead>
          <tbody>
            {escalated.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: "center"}}>No SLA breaches found. Good job!</td></tr>
            ) : (
              escalated.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.priority}</td>
                  <td>{t.assignedTo || "Unassigned"}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>SLA BREACHED</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EscalatedTickets;