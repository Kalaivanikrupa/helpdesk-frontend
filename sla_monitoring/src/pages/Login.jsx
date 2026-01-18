import { useState } from "react";

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Backend "USER" nu tharum, App.js logic-kaaga namma lowercase mathi "user" nu anupurom
        onLogin({ ...data, role: data.role.toLowerCase() });
      } else {
        alert("Invalid Email or Password!");
      }
    } catch (err) {
      alert("Backend connect aagala!");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p onClick={switchToSignup}>New user? Signup</p>
    </div>
  );
}
export default Login;