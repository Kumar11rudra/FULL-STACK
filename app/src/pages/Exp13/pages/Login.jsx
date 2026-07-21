import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

const Login = () => {

  const [role, setRole] = useState(ROLES.VIEWER);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {

    login(role);

    switch (role) {

      case ROLES.ADMIN:
        navigate("/admin");
        break;

      case ROLES.EDITOR:
        navigate("/editor");
        break;

      default:
        navigate("/viewer");

    }

  };

  return (

    <div className="login-box">

      <h2>Login</h2>

      <p>

        Select a role to continue

      </p>

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
      >

        <option value={ROLES.ADMIN}>
          Admin
        </option>

        <option value={ROLES.EDITOR}>
          Editor
        </option>

        <option value={ROLES.VIEWER}>
          Viewer
        </option>

      </select>

      <button onClick={handleLogin}>

        Login

      </button>

    </div>

  );

};

export default Login;
