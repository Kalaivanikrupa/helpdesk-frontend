import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import UserNavbar from "../components/UserNavbar";
import AllTickets from "../components/AllTickets";
import AssignTickets from "../components/AssignedTickets";
import UsersList from "../components/UsersList";
import AdminEscalatedTickets from "../components/AdminEscalatedTickets";

function AdminDashboard({ user, onLogout }) { // ✅ onLogout prop-ah App.js-la irundhu vaangi irukkom
  const [page, setPage] = useState("all");

  return (
    <div className="dashboard-container">
      <AdminSidebar
        setPage={(p) => {
          if (p === "logout") {
            onLogout(); // ✅ App.js-la irukkura handleLogout trigger aagum
          } else {
            setPage(p);
          }
        }}
      />

      <div className="main-content">
        <UserNavbar user={user} />

        <div className="content-area">
          {page === "all" && <AllTickets />}
          {page === "escalated" && <AdminEscalatedTickets />}
          {page === "assign" && <AssignTickets />}
          {page === "users" && <UsersList />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;