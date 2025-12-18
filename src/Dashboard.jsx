import React from "react";
import IdentityCard from "./components/IdentityCard";
import AccountsOverview from "./components/AccountsOverview";
import JobsEducation from "./components/JobsEducation";
import AddressTimeline from "./components/AddressTimeline";
import RelationshipGraph from "./components/RelationshipGraph";

export default function Dashboard({ data }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* PAGE TITLE */}
      <div className="section">
        <h1 className="text-3xl font-bold">
          📊 Financial & Background Dashboard
        </h1>
      </div>

      {/* IDENTITY */}
      <div className="section card">
        <IdentityCard data={data} />
      </div>

      {/* CHARTS ROW */}
      <div
        className="section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <div className="card">
          <div className="card-title">Accounts Overview</div>
          <AccountsOverview data={data} />
        </div>
      </div>

      {/* JOBS & EDUCATION */}
      <div className="section card">
        <JobsEducation data={data} />
      </div>

      {/* ADDRESS TIMELINE */}
      <div className="section card">
        <AddressTimeline addresses={data.addresses_timeline} />
      </div>

      {/* RELATIONSHIP GRAPH */}
      <div className="section card">
        <RelationshipGraph data={data} />
      </div>

    </div>
  );
}
