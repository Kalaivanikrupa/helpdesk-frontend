function AdminNavbar({ user, logout }) {
  return (
    <div className="navbar">
      <span>
        Logged in as: <b>{user.email}</b> (Admin)
      </span>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
export default AdminNavbar;