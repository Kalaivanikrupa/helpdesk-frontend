import { useState, useEffect } from "react";

function DeclineRequests({ user }) {
  const [tickets, setTickets] = useState([]);
  const [supporters, setSupporters] = useState([]);
  const [transferSelect, setTransferSelect] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Backend
  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Fetch tickets with status "Awaiting Manager Approval"
      const ticketRes = await fetch("http://localhost:8080/api/tickets");
      const ticketData = await ticketRes.json();
      
      const declined = ticketData.filter(t => 
        t.status === "Awaiting Manager Approval" && 
        t.domain.toLowerCase() === user.domain.toLowerCase()
      );
      setTickets(declined);

      // Fetch available support members for transfer dropdown
      const supportRes = await fetch(`http://localhost:8080/api/users/available-support/${user.domain}`);
      const supportData = await supportRes.json();
      setSupporters(supportData);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching decline requests:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // 2. Manager Action (Approve/Reject)
  const handleManagerAction = async (ticketId, action) => {
    const newSupport = transferSelect[ticketId] || ""; // Empty-ah ponalum backend fallback handle pannum

    try {
      // Backend mapping: @PutMapping("/{id}/manager-action")
      const res = await fetch(`http://localhost:8080/api/tickets/${ticketId}/manager-action?action=${action}&newSupportName=${newSupport}`, {
        method: "PUT"
      });

      if (res.ok) {
        alert(action === "APPROVE" ? "Transfer Approved!" : "Decline Rejected!");
        fetchData(); // Refresh everything
      } else {
        alert("Action failed on server.");
      }
    } catch (err) {
      alert("Network error!");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="decline-requests">
      <h2>Decline Requests (Domain: {user.domain})</h2>
      
      {loading ? <p>Loading requests...</p> : (
        tickets.length === 0 ? <p>No pending decline requests.</p> : (
          <table className="tickets-table" border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th>ID</th>
                <th>Title</th>
                <th>Original Support</th>
                <th>Decline Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.assignedTo}</td>
                  <td style={{ color: "red" }}>{t.declineReason || "No reason provided"}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <select 
                        value={transferSelect[t.id] || ""} 
                        onChange={(e) => setTransferSelect({...transferSelect, [t.id]: e.target.value})}
                        style={{ padding: "5px" }}
                      >
                        <option value="">-- Option 3: Assign to Me --</option>
                        {supporters.map(s => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      
                      <button 
                        onClick={() => handleManagerAction(t.id, "APPROVE")}
                        style={{ background: "#2ecc71", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
                      >
                        Approve
                      </button>
                      
                      <button 
                        onClick={() => handleManagerAction(t.id, "REJECT")}
                        style={{ background: "#e74c3c", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default DeclineRequests;