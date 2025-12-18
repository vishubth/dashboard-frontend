// src/components/charts/CreditLimitPie.jsx
import React from "react";
import Plot from "react-plotly.js";
import { CREDITOR_COLORS, FALLBACK_COLORS } from "./creditorColors";

const CreditLimitPie = ({ openAccounts = [] }) => {
  const grouped = {};

  openAccounts.forEach(acc => {
    grouped[acc.creditor] =
      (grouped[acc.creditor] || 0) + (acc.credit_limit || 0);
  });

  const creditors = Object.keys(grouped);
  const values = creditors.map(c => grouped[c]);

  const colors = creditors.map(
    (c, i) => CREDITOR_COLORS[c] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]
  );

  const hoverText = creditors.map(
    c => `Total Credit Limit: $${grouped[c].toLocaleString()}`
  );

  return (
    <div className="chart-card">

      <Plot
          data={[
            {
              type: "pie",
              labels: creditors,
              values,
              marker: { colors },
              textinfo: "value",
              hoverinfo: "label+text",
              customdata: hoverText,
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

export default CreditLimitPie;
