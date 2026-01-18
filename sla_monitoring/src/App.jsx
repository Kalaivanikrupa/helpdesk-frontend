import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./dashboards/UserDashboard";
import SupportDashboard from "./dashboards/SupportDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("landing");
  // 1. Initial user-ah localStorage-la irundhu edukkurom
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("app_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. User login aagum pothu localStorage-layum save panrom
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("app_user", JSON.stringify(userData));
  };

  // 3. Simple Logout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
    setPage("landing");
  };

  // 🔹 If NOT logged in
  if (!user) {
    if (page === "landing") {
      return (
        <LandingPage
          goToLogin={() => setPage("login")}
          goToSignup={() => setPage("signup")}
        />
      );
    }

    if (page === "login") {
      return (
        <Login
          onLogin={handleLogin} // ✅ Modified handler
          switchToSignup={() => setPage("signup")}
        />
      );
    }

    return (
      <Signup
        switchToLogin={() => setPage("login")}
      />
    );
  }

  // 🔹 Role-based dashboard (Logout prop ellathukum pass panrom)
  switch (user.role.toLowerCase()) { // toLowerCase() safety-ku
    case "user":
      return <UserDashboard user={user} onLogout={handleLogout} />;

    case "support":
      return <SupportDashboard user={user} onLogout={handleLogout} />;

    case "manager":
      return <ManagerDashboard user={user} onLogout={handleLogout} />;

    case "admin":
      return <AdminDashboard user={user} onLogout={handleLogout} />;

    default:
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Unknown Role: {user.role}</h2>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      );
  }
}

export default App;