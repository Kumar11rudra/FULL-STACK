import { useState } from "react";

import { saveToken } from "../utils/auth";
import { generateToken, decodeToken } from "../utils/jwt";

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      username === "admin" &&
      password === "1234"
    ) {

      const token = generateToken(username);

      saveToken(token);

      onLogin(decodeToken(token));

    } else {

      alert("Invalid username or password");

    }

  };

  return (

    <div className="card">

      <h2>JWT Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">

          Login

        </button>

      </form>

    </div>

  );

};

export default Login;
