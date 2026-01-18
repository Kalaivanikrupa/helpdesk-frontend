function AdminSidebar({ setPage }) {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <button onClick={() => setPage("all")}>All Tickets</button>
        <button onClick={() => setPage("escalated")}>Escalated Tickets</button>
        <button onClick={() => setPage("users")}>Users List</button>
      </div>
      
      {/* Logout button-ah red color or styling-ku kootalam */}
      <button 
        onClick={() => setPage("logout")} 
        className="logout-btn" 
        style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;