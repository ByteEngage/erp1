import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>ERP</h2>

      <ul>
        <li>Dashboard</li>
        <li>Leads</li>
        <li>Enquiry</li>
        <li>Quotation</li>
        <li>Orders</li>
        <li>Customers</li>
      </ul>
    </div>
  );
}

export default Sidebar;