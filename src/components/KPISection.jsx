// src/components/charts/KPISection.jsx
import React from "react";
import "./charts/chartStyles.css";

const KPISection = ({ kpis }) => {
  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <h3>Total OPEN Accounts</h3>
        <p>{kpis.open_accounts}</p>
      </div>

      <div className="kpi-card">
        <h3>Total CLOSED Accounts</h3>
        <p>{kpis.closed_accounts}</p>
      </div>

      <div className="kpi-card">
        <h3>Total Credit Limit</h3>
        <p>${kpis.total_credit_limit.toLocaleString()}</p>
      </div>

      <div className="kpi-card">
        <h3>Total Current Balance</h3>
        <p>${kpis.current_total_balance.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default KPISection;
