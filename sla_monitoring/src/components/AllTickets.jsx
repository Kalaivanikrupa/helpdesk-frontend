import { useState, useEffect } from "react";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL changed to Render backend
    fetch("https://helpdesk-backend-ektm.onrender.com/api/tickets")
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => console.error("Admin Fetch Error:", err));
  }, []);

  return (
    <div className="team-tickets">
      <h2>All System Tickets</h2>
      {loading ? <p>Loading all tickets...</p> : (
        <table className="tickets-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Domain</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td>#{t.id}</td>
                <td>{t.title}</td>
                <td style={{ color: t.status === "Escalated" ? "orange" : "black" }}>{t.status}</td>
                <td>{t.domain}</td>
                <td>{t.assignedTo || "Not Assigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllTickets;