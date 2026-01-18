function SupportNavbar({ user, logout }) {
  return (
    <div className="navbar">
      <span>
        Logged in as: <b>{user.email}</b> (Support)
      </span>

      <div>
        <button onClick={logout} className="logout">Logout</button>
      </div>
    </div>
  );
}

export default SupportNavbar;
