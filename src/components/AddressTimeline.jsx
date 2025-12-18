// src/components/AddressTimeline.jsx
import React, { useMemo } from "react";
import Plot from "react-plotly.js";
import "../styles/addressTimeline.css";

/**
 * Converts Streamlit px.timeline to React Plotly
 */
export default function AddressTimeline({ addresses = [] }) {
  const plotData = useMemo(() => {
    const cleanDate = (x) => {
      if (!x || x === "-" || x === "NA") return null;
      if (typeof x === "string" && x.toLowerCase().startsWith("present")) {
        return new Date();
      }
      // Year only
      if (typeof x === "string" && x.length === 4 && !isNaN(x)) {
        return new Date(`${x}-01-01`);
      }
      const d = new Date(x);
      return isNaN(d) ? null : d;
    };

    const cleaned = addresses
      .map((a) => ({
        place: a.place,
        remarks: a.remarks || "NA",
        start: cleanDate(a.started),
        end: cleanDate(a.left),
      }))
      .filter((a) => a.start && a.end);

    // Group by remarks (like px.timeline color="remarks")
    const groups = {};
    cleaned.forEach((row) => {
      if (!groups[row.remarks]) groups[row.remarks] = [];
      groups[row.remarks].push(row);
    });

    return Object.entries(groups).map(([remark, rows]) => ({
      type: "bar",
      orientation: "h",
      name: remark,
      y: rows.map((r) => r.place),
      x: rows.map((r) => r.end - r.start),
      base: rows.map((r) => r.start),
      hovertemplate:
        "<b>%{y}</b><br>" +
        "From: %{base|%Y-%m-%d}<br>" +
        "To: %{x|%Y-%m-%d}<extra></extra>",
    }));
  }, [addresses]);

  if (!plotData.length) {
    return (
      <div className="timeline-card">
        <h2>📍 Address Timeline</h2>
        <div className="timeline-empty">
          No valid timeline dates available
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-card">
      <h2 className="timeline-title">📍 Address Timeline</h2>

      <Plot
        data={plotData}
        layout={{
          height: 420,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          barmode: "stack",
          title: {
            text: "Address History Timeline",
            font: { size: 16, color: "#fff" },
          },
          xaxis: {
            title: "Year",
            type: "date",
            showgrid: false,
            color: "#cbd5e1",
          },
          yaxis: {
            title: "Place",
            automargin: true,
            color: "#cbd5e1",
          },
          legend: {
            title: { text: "remarks" },
            font: { size: 11 },
          },
          margin: { l: 220, r: 40, t: 60, b: 40 },
          font: { color: "white" },
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
