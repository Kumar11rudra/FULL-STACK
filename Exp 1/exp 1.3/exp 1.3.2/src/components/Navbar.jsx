import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } = useAuth();

  return (

    <nav className="navbar">

      <h2>RBAC Demo</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {

          !user && (

            <Link to="/login">

              Login

            </Link>

          )

        }

        {

          user && (

            <>

              <Link to="/admin">

                Admin

              </Link>

              <Link to="/editor">

                Editor

              </Link>

              <Link to="/viewer">

                Viewer

              </Link>

              <button
                className="logout-btn"
                onClick={logout}
              >

                Logout

              </button>

            </>

          )

        }

      </div>

    </nav>

  );

};

export default Navbar;
