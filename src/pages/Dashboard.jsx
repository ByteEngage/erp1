import React from "react";
import Sidebar from "../../components/Sidebar";
import "./Dashboard.css";
import "./MasterLayout"
import MasterLayout from "./MasterLayout";
function Dashboard() {
  

  return (
    <div className="dashboard">
      <MasterLayout/>
      <div>
        <div className="cards">
          <div className="card">Leads: 10</div>
          <div className="card">Enquiries: 5</div>
          <div className="card">Orders: 3</div>
          <div className="card">Revenue: ₹50,000</div>
        </div>
        Coming Soooon......
      </div>
    </div>
  );
}

export default Dashboard;