import { useState } from "react";
import ManagerSidebar from "../components/ManagerSidebar";
import UserNavbar from "../components/UserNavbar";
import TeamTickets from "../components/TeamTickets";
import EscalatedTickets from "../components/EscalatedTickets";
import SlaDashboard from "../components/SlaDashboard";
import DeclineRequests from "../components/DeclineRequests";

function ManagerDashboard({ user, onLogout }) {
  const [page, setPage] = useState("team");
  const [tickets, setTickets] = useState([]);

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      {/* 🔹 Correct-ah onLogout prop-ah anupuroam */}
      <ManagerSidebar setPage={setPage} onLogout={onLogout} />

      <div className="main-content" style={{ flex: 1 }}>
        {user && <UserNavbar user={user} onLogout={onLogout} />}

        <div className="content-area" style={{ padding: "20px" }}>
          {page === "team" && (
            <TeamTickets 
              user={user} 
              tickets={tickets} 
              setTickets={setTickets} 
            />
          )}
          
          {page === "declines" && (
            <DeclineRequests 
              user={user} 
              tickets={tickets} 
              updateTickets={setTickets} 
            />
          )}

          {page === "escalated" && <EscalatedTickets user={user} />}
          {page === "sla" && <SlaDashboard user={user} />}
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;