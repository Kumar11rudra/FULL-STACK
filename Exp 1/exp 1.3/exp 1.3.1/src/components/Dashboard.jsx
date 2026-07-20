import Header from "./Header";

const Dashboard = ({
  user,
  onLogout,
}) => {

  return (

    <div className="card dashboard">

      <Header />

      <h2>

        Welcome

      </h2>

      <p>

        Username: <strong>{user.username}</strong>

      </p>

      <p>

        Login Successful using JWT

      </p>

      <button
        className="logout"
        onClick={onLogout}
      >

        Logout

      </button>

    </div>

  );

};

export default Dashboard;
