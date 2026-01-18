function UserSidebar({ setPage, onLogout }) {
  return (
    <div className="sidebar" style={{ width: "250px", height: "100vh", background: "#2c3e50", color: "white", padding: "20px" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>User Portal</h3>
      
      <button 
        onClick={() => setPage("myTickets")} 
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px" }}
      >
        My Tickets
      </button>

      <button 
        onClick={() => setPage("createTicket")} 
        style={{ display: "block", width: "100%", padding: "12px", marginBottom: "10px", cursor: "pointer", border: "none", borderRadius: "4px" }}
      >
        Create Ticket
      </button>
      
      <div style={{ marginTop: "50px" }}>
        {/* Inga setPage anupama, App.jsx-oda onLogout-ah call panrom */}
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

export default UserSidebar;