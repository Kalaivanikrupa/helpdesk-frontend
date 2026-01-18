import { useState } from "react";
import SupportSidebar from "../components/SupportSidebar";
import UserNavbar from "../components/UserNavbar"; 
import AssignedTickets from "../components/TeamAssignTickets";

function SupportDashboard({ user, onLogout }) {
  const [page, setPage] = useState("assignedTickets");

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      {/* onLogout function-ah sidebar-ku anupuroam */}
      <SupportSidebar setPage={setPage} onLogout={onLogout} />
      
      <div className="main-content" style={{ flex: 1 }}>
        <UserNavbar user={user} onLogout={onLogout} />
        
        <div className="content-area" style={{ padding: "20px" }}>
          {/* Support person-oda tickets-ah fetch panna user prop mukkiyam */}
          {page === "assignedTickets" && <AssignedTickets user={user} />}
        </div>
      </div>
    </div>
  );
}

export default SupportDashboard;