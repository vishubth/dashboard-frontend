// src/components/AccountsOverview.jsx
import React from "react";

import KPISection from "./KPISection";

// Charts
import OpenAccountsPie from "./charts/OpenAccountsPie";
import CreditLimitPie from "./charts/CreditLimitPie";
import BalancePie from "./charts/BalancePie";
import ClosedAccountsPie from "./charts/ClosedAccountsPie";

import "./charts/chartStyles.css";

export default function AccountsOverview({ data }) {
  const open = data.open_accounts || [];
  const closed = data.closed_accounts || [];

  const totalCreditLimit = open.reduce(
    (sum, a) => sum + (a.credit_limit || 0),
    0
  );

  const totalBalance = open.reduce(
    (sum, a) => sum + (a.current_balance || 0),
    0
  );

  return (
    <div className="accounts-overview-grid">

      {/* OPEN ACCOUNTS */}
      <div className="overview-card">
        <h4>Total OPEN Accounts</h4>
        <div className="kpi-value">{open.length}</div>
        <OpenAccountsPie openAccounts={open} />
      </div>

      {/* CLOSED ACCOUNTS */}
      <div className="overview-card">
        <h4>Total CLOSED Accounts</h4>
        <div className="kpi-value">{closed.length}</div>
        <ClosedAccountsPie closedAccounts={closed} />
      </div>

      {/* CREDIT LIMIT */}
      <div className="overview-card">
        <h4>Total Credit Limit</h4>
        <div className="kpi-value">
          ${totalCreditLimit.toLocaleString()}
        </div>
        <CreditLimitPie openAccounts={open} />
      </div>

      {/* BALANCE */}
      <div className="overview-card">
        <h4>Total Current Balance</h4>
        <div className="kpi-value">
          ${totalBalance.toLocaleString()}
        </div>
        <BalancePie openAccounts={open} />
      </div>

    </div>
  );
}