import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { signout, deleteAccount } = useAuth();

  return (
    <nav>
      <h2>Welcome</h2>
      <div className="buttons">
        <Link to="signin">
          <button onClick={signout}>Sign Out</button>
        </Link>
        <Link to="signup">
          <button onClick={deleteAccount}>Delete Account</button>
        </Link>
      </div>
    </nav>
  );
};

export default Dashboard;
