function UserNavbar({ user }) {
  return (
    <div className="topbar">
      <div className="profile">
        <div className="profile-circle">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span>{user.name} ({user.role})</span>
      </div>
    </div>
  );
}

export default UserNavbar;
