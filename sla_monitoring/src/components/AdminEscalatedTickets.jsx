import { useState, useEffect } from "react";

function AdminEscalatedTickets() {
  const [escalated, setEscalated] = useState([]);

  useEffect(() => {
    // URL changed to Render backend
    fetch("https://helpdesk-backend-ektm.onrender.com/api/tickets")
      .then(res => res.json())
      .then(data => {
        // Only show escalated tickets
        const filtered = data.filter(t => t.status === "Escalated");
        setEscalated(filtered);
      });
  }, []);

  return (
    <div className="team-tickets">
      <h2>Escalated Tickets</h2>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {escalated.map((t) => (
            <tr key={t.id}>
              <td>#{t.id}</td>
              <td>{t.title}</td>
              <td>{t.priority}</td>
              <td>{t.domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEscalatedTickets;