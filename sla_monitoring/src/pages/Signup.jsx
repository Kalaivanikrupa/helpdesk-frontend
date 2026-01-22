import { useState } from "react";

function Signup({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [domain, setDomain] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: role.toUpperCase(),
      domain: domain.toLowerCase(),
      available: true
    };

    try {
      // Inga thaan namma Render URL-ah kuduthurukom
      const response = await fetch("https://helpdesk-backend-ektm.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Signup Successful! Please Login.");
        switchToLogin();
      } else {
        alert("Signup failed. Email already exists or server error.");
      }
    } catch (err) {
      alert("Backend server (Render) connect aagala!");
    }
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="support">Support</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      {(role === "support" || role === "manager") && (
        <select value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="">Select Domain</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
          <option value="network">Network</option>
        </select>
      )}

      <button onClick={handleSignup}>Signup</button>
      <p style={{cursor: 'pointer'}} onClick={switchToLogin}>Already have an account? Login</p>
    </div>
  );
}
export default Signup;