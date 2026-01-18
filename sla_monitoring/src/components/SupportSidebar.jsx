import React from "react";

function SupportSidebar({ setPage, onLogout }) {
  return (
    <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#2c3e50", color: "white", padding: "20px" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>Support Panel</h3>
      
      <button 
        onClick={() => setPage("assignedTickets")} 
        style={{ 
          display: "block", width: "100%", padding: "12px", marginBottom: "10px", 
          cursor: "pointer", border: "none", borderRadius: "4px", background: "#34495e", color: "white" 
        }}
      >
        Assigned Tickets
      </button>

      <div style={{ marginTop: "50px" }}>
        {/* Inga thaan App.jsx logout call aagum */}
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

export default SupportSidebar;