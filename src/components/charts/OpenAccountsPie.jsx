import React from "react";
import Plot from "react-plotly.js";
import { getCreditorColor } from "./getCreditorColor";

const OpenAccountsPie = ({ openAccounts }) => {
  const grouped = {};

  openAccounts.forEach(acc => {
    if (!grouped[acc.creditor]) grouped[acc.creditor] = [];
    grouped[acc.creditor].push(acc);
  });

  const labels = Object.keys(grouped);
  const values = labels.map(c => grouped[c].length);
  const colors = labels.map(getCreditorColor);

  const hoverTexts = labels.map(c =>
    grouped[c]
      .map(acc =>
        `Opened: ${acc.opened}<br>` +
        `Balance: $${acc.current_balance}<br>` +
        `Credit Limit: $${acc.credit_limit}<br>` +
        `Status: ${acc.status}<br>`
      )
      .join("<br>")
  );

  return (
    <div className="chart-card">
    
      <Plot
        data={[
          {
            type: "pie",
            labels,
            values,
            marker: { colors },
            textinfo: "value",
            hoverinfo: "label+text",
            customdata: hoverTexts,
            hovertemplate: "%{label}<br>%{customdata}<extra></extra>",
          },
        ]}
        layout={{
          width: 220,
          height: 220,
          margin: { t: 10, b: 30, l: 10, r: 10 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "#fff", size: 10 },

          // 👇 ADD THIS HERE
          legend: {
            orientation: "h",
            x: 0.5,
            xanchor: "center",
            y: -0.2,
            font: { size: 9 },
          },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default OpenAccountsPie;
