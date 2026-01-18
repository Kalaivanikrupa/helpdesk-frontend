function Header({ onLoginClick, onSignupClick }) {
  return (
    <div className="header">
      <button onClick={onLoginClick}>Login</button>
      <button onClick={onSignupClick}>Signup</button>
    </div>
  );
}

export default Header;
