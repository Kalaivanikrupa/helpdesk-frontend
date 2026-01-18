function ManagerNavbar({ user, logout }) {
  return (
    <div className="navbar">
      <span>
        Logged in as: <b>{user.email}</b> (Manager)
      </span>
      <button className="logout" onClick={logout}>Logout</button>
    </div>
  );
}

export default ManagerNavbar;
