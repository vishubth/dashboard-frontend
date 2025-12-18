import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("ACTIVE_PROFILE");
    if (cached) {
      setData(JSON.parse(cached));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div>No profile loaded</div>
          <a href="/" className="text-blue-400 underline">
            Go back to intake
          </a>
        </div>
      </div>
    );
  }

  return <Dashboard data={data} />;
}
