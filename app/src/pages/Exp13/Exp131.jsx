import { useEffect, useState } from "react";

const STORAGE_KEY = "exp131-token";
const demoUser = {
  name: "Ava",
  email: "ava@example.com",
  role: "Admin",
};

export default function Exp131() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem(STORAGE_KEY);
    if (token) {
      setUser(demoUser);
    }
  }, []);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    window.localStorage.setItem(STORAGE_KEY, "demo-token");
    setUser(demoUser);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <h1>JWT Authentication Flow</h1>
      <p className="subtitle">Experiment 1.3.1</p>

      {user ? (
        <div className="card" style={{ textAlign: "left" }}>
          <h2>Welcome back, {user.name}</h2>
          <p>{user.email}</p>
          <p style={{ marginTop: "8px" }}>Role: {user.role}</p>
          <button className="btn" onClick={handleLogout} style={{ marginTop: "16px", border: "none", cursor: "pointer" }}>
            Log out
          </button>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "left" }}>
          <h2>Sign in</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }} />
            <button className="btn" onClick={handleLogin} style={{ border: "none", cursor: "pointer", width: "fit-content" }}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
