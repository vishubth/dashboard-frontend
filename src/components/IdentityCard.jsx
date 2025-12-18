import React from "react";

/* ---------- Small helper for colored labels ---------- */
function Label({ children }) {
  return (
    <span className="text-blue-300 font-medium">
      {children}
    </span>
  );
}

export default function IdentityCard({ data }) {
  const person = data.identity || {};
  const usernames = data.username || [];
  const criminal = data.criminal_history || {};
  const contacts = data.contacts || {};

  const emails = contacts.emails || [];
  const phones = contacts.phones || [];
  const cases = criminal.case_numbers || [];

  return (
    <div className="rounded-2xl p-5 shadow-xl bg-gradient-to-br from-gray-800 to-gray-900">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          🧍 {person.name || "Unknown"}
        </h2>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

        {/* LEFT: CORE INFO */}
        <div className="space-y-2">
          <div>
            <Label>SSN:</Label> <span className="text-white">{person.ssn || "NA"}</span>
          </div>

          <div>
            <Label>DOB / Age:</Label>{" "}
            <span className="text-white">
              {person.dob || "NA"} | {person.age || "NA"}
            </span>
          </div>

          <div>
            <Label>Address:</Label>{" "}
            <span className="text-white">
              {person.current_address || "NA"}
            </span>
          </div>

          <div>
            <Label>Aliases:</Label>{" "}
            <span className="text-white">
              {person.aliases?.length
                ? person.aliases.join(", ")
                : "None"}
            </span>
          </div>
        </div>

        {/* RIGHT: COLLAPSIBLES */}
        <div className="space-y-3">

          {/* EMAILS */}
          <details className="bg-gray-800 rounded-lg p-3">
            <summary className="cursor-pointer font-semibold text-white">
              📧 Emails ({emails.length})
            </summary>

            <div className="mt-2 space-y-1 text-gray-300">
              {emails.length
                ? emails.map((e, i) => <div key={i}>• {e}</div>)
                : <div>None found</div>}
            </div>
          </details>

          {/* PHONES */}
          <details className="bg-gray-800 rounded-lg p-3">
            <summary className="cursor-pointer font-semibold text-white">
              📞 Phones ({phones.length})
            </summary>

            <div className="mt-2 space-y-1 text-gray-300">
              {phones.length
                ? phones.map((p, i) => <div key={i}>• {p}</div>)
                : <div>None found</div>}
            </div>
          </details>

          {/* USERNAMES */}
          <details className="bg-gray-800 rounded-lg p-3">
            <summary className="cursor-pointer font-semibold text-white">
              👤 Usernames ({usernames.length})
            </summary>

            <div className="mt-2 space-y-1 text-gray-300">
              {usernames.length
                ? usernames.map((u, i) => <div key={i}>• {u}</div>)
                : <div>None found</div>}
            </div>
          </details>

          {/* CRIMINAL HISTORY */}
          <details className="bg-gray-800 rounded-lg p-3">
            <summary className="cursor-pointer font-semibold text-white">
              ⚖ Criminal History ({cases.length})
            </summary>

            <div className="mt-2 max-h-40 overflow-y-auto space-y-2 text-gray-300">
              {cases.length ? (
                cases.map((c, i) => (
                  <details
                    key={i}
                    className="bg-gray-700 rounded-md p-2"
                  >
                    <summary className="cursor-pointer text-white">
                      Case #{i + 1}
                    </summary>

                    <div className="mt-1 text-sm">
                      <div>
                        <Label>Case ID:</Label>{" "}
                        <span className="text-white">{c}</span>
                      </div>

                      <div>
                        <Label>Crime:</Label>{" "}
                        <span className="text-white">
                          {criminal.crime || "NA"}
                        </span>
                      </div>
                    </div>
                  </details>
                ))
              ) : (
                <div>No criminal records</div>
              )}
            </div>
          </details>

        </div>
      </div>
    </div>
  );
}
