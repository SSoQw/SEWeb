import React from "react";
import { useAuth } from "../../contexts/authContext";


const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
