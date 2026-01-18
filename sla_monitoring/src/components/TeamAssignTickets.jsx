import { useState, useEffect } from "react";

function TeamAssignTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch only tickets assigned to THIS support person
  const fetchData = async () => {
    if (!user || !user.name) return;
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/tickets");
      const data = await res.json();
      
      // Filter: Intha support person-ku assign aagi, innum resolve aagatha tickets
      const myTickets = data.filter(t => 
        t.assignedTo === user.name && 
        t.status !== "Resolved"
      );
      setTickets(myTickets);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching support tickets:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // 2. Resolve Ticket Logic (Backend Sync)
  const resolveTicket = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/tickets/${id}/resolve`, {
        method: "PUT"
      });
      if (res.ok) {
        alert("Ticket Resolved! You are now free for new tasks.");
        fetchData(); // Refresh list
      }
    } catch (err) {
      alert("Error resolving ticket");
    }
  };

  // 3. Decline Ticket Logic (Backend Sync)
  const declineTicket = async (id) => {
    const reason = prompt("Enter reason for declining this ticket:");
    if (!reason) {
      alert("Decline reason is mandatory");
      return;
    }

    try {
      // Backend status-ah "Awaiting Manager Approval" nu mathum
      const res = await fetch(`http://localhost:8080/api/tickets/${id}/decline?reason=${reason}`, {
        method: "PUT"
      });
      if (res.ok) {
        alert("Decline request sent to Manager.");
        fetchData(); // Refresh list
      }
    } catch (err) {
      alert("Error declining ticket");
    }
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="assigned-tickets">
      <h2>Welcome {user.name}, Your Assigned Tickets</h2>
      
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <table className="tickets-table" border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>No active tickets assigned to you.</td></tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.priority}</td>
                  <td>
                    <span className={`status-badge ${t.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    {t.status === "Awaiting Manager Approval" ? (
                      <span style={{ color: "orange", fontWeight: "bold" }}>🕒 Pending Manager Action</span>
                    ) : (
                      <>
                        <button 
                          onClick={() => resolveTicket(t.id)}
                          style={{ background: "#2ecc71", color: "white", marginRight: "10px", padding: "5px 10px", border: "none", cursor: "pointer" }}
                        >
                          Resolve
                        </button>
                        <button 
                          onClick={() => declineTicket(t.id)}
                          style={{ background: "#e74c3c", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
                        >
                          Decline
                        </button>
                      </>
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

export default TeamAssignTickets;