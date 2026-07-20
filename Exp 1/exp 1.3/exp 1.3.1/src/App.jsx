import { useEffect, useState } from "react";

import "./App.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { getToken, removeToken } from "./utils/auth";

import {
  decodeToken,
  isTokenExpired,
} from "./utils/jwt";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = getToken();

    if (!token) return;

    if (isTokenExpired(token)) {

      removeToken();

      return;

    }

    const decoded = decodeToken(token);

    if (decoded) {

      setUser(decoded);

    }

  }, []);

  const handleLogout = () => {

    removeToken();

    setUser(null);

  };

  return (

    <div className="app">

      {

        user ? (

          <Dashboard
            user={user}
            onLogout={handleLogout}
          />

        ) : (

          <Login
            onLogin={setUser}
          />

        )

      }

    </div>

  );

}

export default App;
