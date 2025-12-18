// src/components/JobsEducation.jsx
import React, { useState } from "react";

export default function JobsEducation({ data }) {
  const jobs = data.jobs || [];
  const education = data.education || [];

  const [showJobs, setShowJobs] = useState(true);
  const [showEdu, setShowEdu] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* ================= EMPLOYMENT HISTORY ================= */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg">

        {/* Header */}
        <button
          onClick={() => setShowJobs(!showJobs)}
          className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-700"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            💼 Employment History
          </h2>
          <span className="text-gray-400">
            {showJobs ? "▾" : "▸"}
          </span>
        </button>

        {/* Table */}
        {showJobs && (
          <div className="p-4 overflow-x-auto">
            {jobs.length === 0 ? (
              <p className="text-sm text-gray-400">No employment records found.</p>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-2 px-2 w-8">#</th>
                    <th className="py-2 px-2">company</th>
                    <th className="py-2 px-2">title</th>
                    <th className="py-2 px-2">start</th>
                    <th className="py-2 px-2">end</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-800 last:border-none"
                    >
                      <td className="py-2 px-2 text-gray-500">{idx}</td>
                      <td className="py-2 px-2">{job.company || "-"}</td>
                      <td className="py-2 px-2">{job.title || "-"}</td>
                      <td className="py-2 px-2">{job.start || "-"}</td>
                      <td className="py-2 px-2">{job.end || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ================= EDUCATION HISTORY ================= */}
      <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg">

        {/* Header */}
        <button
          onClick={() => setShowEdu(!showEdu)}
          className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-700"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🎓 Education History
          </h2>
          <span className="text-gray-400">
            {showEdu ? "▾" : "▸"}
          </span>
        </button>

        {/* Table */}
        {showEdu && (
          <div className="p-4 overflow-x-auto">
            {education.length === 0 ? (
              <p className="text-sm text-gray-400">No education history available.</p>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-2 px-2 w-8">#</th>
                    <th className="py-2 px-2">school</th>
                    <th className="py-2 px-2">degree</th>
                    <th className="py-2 px-2">years</th>
                    <th className="py-2 px-2">remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-800 last:border-none"
                    >
                      <td className="py-2 px-2 text-gray-500">{idx}</td>
                      <td className="py-2 px-2">{edu.school || "-"}</td>
                      <td className="py-2 px-2">{edu.degree || "-"}</td>
                      <td className="py-2 px-2">{edu.years || "-"}</td>
                      <td className="py-2 px-2">{edu.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
