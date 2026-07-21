import { Link } from "react-router-dom";

const Unauthorized = () => {

  return (

    <div className="page">

      <h2>

        Access Denied

      </h2>

      <p>

        You do not have permission
        to access this page.

      </p>

      <br />

      <Link to="/">

        Return to Home

      </Link>

    </div>

  );

};

export default Unauthorized;
