import { useState, useEffect } from "react";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import MyTickets from "../components/MyTickets";
import CreateTicket from "../components/CreateTicket";

function UserDashboard({ user, onLogout }) {
  const [page, setPage] = useState("myTickets");
  const [tickets, setTickets] = useState([]);

  // Backend-la irundhu tickets fetch panna
  const fetchTickets = async () => {
    if (!user) return;
    try {
      // Changed localhost to Render URL
      const res = await fetch("https://helpdesk-backend-ektm.onrender.com/api/tickets");
      const data = await res.json();
      // Current user create panna tickets mattum
      const myTickets = data.filter(t => t.createdBy === user.name);
      setTickets(myTickets);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleTicketCreated = () => {
    fetchTickets(); 
    setPage("myTickets"); 
  };

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <UserSidebar setPage={setPage} onLogout={onLogout} />
      
      <div className="main-content" style={{ flex: 1 }}>
        <UserNavbar user={user} />
        <div className="content-area">
          {page === "myTickets" && (
            <MyTickets tickets={tickets} user={user} />
          )}
          {page === "createTicket" && (
            <CreateTicket user={user} onTicketCreated={handleTicketCreated} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;