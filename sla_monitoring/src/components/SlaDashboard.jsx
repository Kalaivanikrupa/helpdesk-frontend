import { useState, useEffect } from "react";

function SlaDashboard({ user }) {
  const [stats, setStats] = useState({ resolved: 0, escalated: 0, total: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Changed to Render URL
        const res = await fetch("https://helpdesk-backend-ektm.onrender.com/api/tickets");
        const data = await res.json();
        
        const domainTickets = data.filter(t => t.domain.toLowerCase() === user.domain.toLowerCase());
        const resolvedCount = domainTickets.filter(t => t.status === "Resolved").length;
        const escalatedCount = domainTickets.filter(t => t.status === "Escalated").length;
        
        setStats({
          resolved: resolvedCount,
          escalated: escalatedCount,
          total: domainTickets.length
        });
      } catch (err) {
        console.error("Stats error", err);
      }
    };
    if(user) fetchStats();
  }, [user]);

  // Percentage calculation
  const getPercent = (count) => {
    if (stats.total === 0) return 0;
    return Math.round((count / stats.total) * 100);
  };

  return (
    <div>
      <h2>SLA Compliance Dashboard</h2>
      <p>Domain: <strong>{user?.domain}</strong></p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{
          width: "200px", padding: "20px", background: "#2ecc71", color: "white", borderRadius: "8px", textAlign: "center"
        }}>
          <h3>Resolved</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{getPercent(stats.resolved)}%</p>
          <small>{stats.resolved} Tickets</small>
        </div>

        <div style={{
          width: "200px", padding: "20px", background: "#e74c3c", color: "white", borderRadius: "8px", textAlign: "center"
        }}>
          <h3>Escalated</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{getPercent(stats.escalated)}%</p>
          <small>{stats.escalated} Tickets</small>
        </div>
      </div>
    </div>
  );
}

export default SlaDashboard;