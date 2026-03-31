import React from "react";
import Sidebar from "../../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      
      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <h2>Dashboard</h2>
          <div className="user-info">
            Welcome, {user?.username}
          </div>
        </div>

        <div className="cards">
          <div className="card">Leads: 10</div>
          <div className="card">Enquiries: 5</div>
          <div className="card">Orders: 3</div>
          <div className="card">Revenue: ₹50,000</div>
        </div>
        Coming Soooon.......
      </div>
    </div>
  );
}

export default Dashboard;