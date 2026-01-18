import React from "react";

function ManagerSidebar({ setPage, onLogout }) {
  return (
    <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#2c3e50", color: "white", padding: "20px" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>Manager Portal</h3>
      
      <button 
        onClick={() => setPage("team")}
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px", background: "#34495e", color: "white" }}
      >
        Team Tickets
      </button>

      <button 
        onClick={() => setPage("declines")}
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px", background: "#34495e", color: "white" }}
      >
        Decline Requests
      </button>

      <button 
        onClick={() => setPage("escalated")}
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px", background: "#34495e", color: "white" }}
      >
        Escalated Tickets
      </button>

      <button 
        onClick={() => setPage("sla")}
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px", background: "#34495e", color: "white" }}
      >
        SLA Compliance
      </button>

      <div style={{ marginTop: "50px" }}>
        {/* 🔹 Direct-ah App logic call aagum */}
        <button 
          onClick={onLogout} 
          style={{ 
            display: "block", 
            width: "100%", 
            padding: "12px", 
            background: "#e74c3c", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer" 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ManagerSidebar;