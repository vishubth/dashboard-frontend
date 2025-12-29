import React, { useEffect, useState } from "react";

export default function ProfileSummaryPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("ACTIVE_PROFILE");
    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed.data);
    }
  }, []);

  if (!data) {
    return <div style={{ padding: 20 }}>No profile loaded</div>;
  }

  const {
    identity,
    username,
    contacts,
    kpis,
    open_accounts,
    closed_accounts,
    addresses_timeline,
    jobs,
    education,
    family,
    associates,
    neighbors,
    social_profiles,
    criminal_history,
  } = data;

  const hasCriminal = criminal_history?.case_numbers?.length > 0;

  return (
    <div className="profile-wrapper">
      <style>{`
        body {
          background: #f3f6fb;
        }

        .profile-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          font-size: 13px;
          color: #111827;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #cbd5e1;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .profile-header h1 {
          margin: 0;
          font-size: 22px;
        }

        .profile-meta {
          font-size: 12px;
          color: #475569;
        }

        .flags {
          margin-top: 6px;
        }

        .flag {
          display: inline-block;
          padding: 2px 8px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 3px;
          margin-right: 6px;
        }

        .flag.alert {
          background: #dc2626;
          color: white;
        }

        .flag.info {
          background: #2563eb;
          color: white;
        }

        .export-btn {
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
        }

        .section {
          border: 1px solid #cbd5e1;
          background: white;
          margin-bottom: 14px;
        }

        .section-header {
          background: #e5edf6;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .section-body {
          padding: 10px;
        }

        .grid-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 8px;
        }

        .cell .label {
          font-size: 11px;
          color: #475569;
        }

        .cell .value {
          font-weight: 600;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .block {
          border-bottom: 1px dashed #cbd5e1;
          padding: 6px 0;
        }

        .block:last-child {
          border-bottom: none;
        }

        ul {
          margin: 4px 0 0 16px;
        }

        a {
          color: #2563eb;
        }

        @media print {
          .export-btn {
            display: none;
          }
          .section {
            break-inside: avoid;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="profile-header">
        <div>
          <h1>{identity.name}</h1>
          <div className="profile-meta">
            DOB: {identity.dob} · Age: {identity.age}
          </div>

          <div className="flags">
            {hasCriminal && <span className="flag alert">CRIMINAL RECORD</span>}
            <span className="flag info">PROFILE SUMMARY</span>
          </div>
        </div>

        <button className="export-btn" onClick={() => window.print()}>
          Export / Print PDF
        </button>
      </header>

      <Section title="Subject Information">
        <GridRow
          items={[
            { label: "Full Name", value: identity.name },
            { label: "SSN", value: identity.ssn },
            { label: "DOB", value: identity.dob },
            { label: "Age", value: identity.age },
          ]}
        />
        <GridRow
          items={[
            { label: "Current Address", value: identity.current_address },
            { label: "Aliases", value: identity.aliases?.join(", ") },
          ]}
        />
      </Section>

      <Section title="Contact Information">
        <div className="two-col">
          <ListBlock title="Phones" items={contacts?.phones} />
          <ListBlock title="Emails" items={contacts?.emails} />
        </div>
        <ListBlock title="Usernames" items={username} />
      </Section>

      <Section title="Financial Overview">
        <GridRow
          items={[
            { label: "Open Accounts", value: kpis.open_accounts },
            { label: "Closed Accounts", value: kpis.closed_accounts },
            { label: "Total Credit Limit", value: `$${kpis.total_credit_limit}` },
            { label: "Current Balance", value: `$${kpis.current_total_balance}` },
          ]}
        />
      </Section>

      <Section title="Open Credit Accounts">
        {open_accounts.map((a, i) => (
          <div className="block" key={i}>
            <GridRow
              items={[
                { label: "Creditor", value: a.creditor },
                { label: "Opened", value: a.opened },
                { label: "Status", value: a.status },
                { label: "Balance", value: `$${a.current_balance}` },
              ]}
            />
          </div>
        ))}
      </Section>

      <Section title="Closed Accounts">
        {closed_accounts.map((a, i) => (
          <div className="block" key={i}>
            <GridRow
              items={[
                { label: "Creditor", value: a.creditor },
                { label: "Opened", value: a.opened },
                { label: "Closed", value: a.closed },
                { label: "Remarks", value: a.remarks },
              ]}
            />
          </div>
        ))}
      </Section>

      <Section title="Address History">
        {addresses_timeline.map((a, i) => (
          <div className="block" key={i}>
            <strong>{a.place}</strong>
            <div style={{ fontSize: 12, color: "#475569" }}>
              {a.started} → {a.left} · {a.remarks}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Employment History">
        {jobs.map((j, i) => (
          <div className="block" key={i}>
            <GridRow
              items={[
                { label: "Company", value: j.company },
                { label: "Title", value: j.title },
                { label: "From", value: j.start },
                { label: "To", value: j.end },
              ]}
            />
          </div>
        ))}
      </Section>

      <Section title="Education History">
        {education.map((e, i) => (
          <div className="block" key={i}>
            <GridRow
              items={[
                { label: "Institution", value: e.school },
                { label: "Degree", value: e.degree },
                { label: "Years", value: e.years },
                { label: "Remarks", value: e.remarks },
              ]}
            />
          </div>
        ))}
      </Section>

      <Section title="Relationships">
        <GridRow
          items={family.core.map(f => ({
            label: f.relation,
            value: `${f.name} (Age ${f.age})`,
          }))}
        />
      </Section>

      <Section title="Associates & Neighbors">
        <GridRow
          items={associates.map(a => ({
            label: "Associate",
            value: `${a.name} · ${a.location}`,
          }))}
        />
        <GridRow
          items={neighbors.map(n => ({
            label: "Neighbor",
            value: `${n.name} · ${n.address}`,
          }))}
        />
      </Section>

      <Section title="Social Profiles">
        {Object.entries(social_profiles).map(([k, v]) => (
          <div key={k}>
            <strong>{k}:</strong>{" "}
            <a href={v} target="_blank" rel="noreferrer">
              {v}
            </a>
          </div>
        ))}
      </Section>

      <Section title="Criminal History">
        <GridRow
          items={[
            {
              label: "Case Numbers",
              value: criminal_history.case_numbers?.join(", ") || "None",
            },
            { label: "Crime", value: criminal_history.crime },
          ]}
        />
      </Section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        {open ? "▾" : "▸"} {title}
      </div>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
};

const GridRow = ({ items }) => (
  <div className="grid-row">
    {items.map((i, idx) => (
      <div className="cell" key={idx}>
        <div className="label">{i.label}</div>
        <div className="value">{i.value || "NA"}</div>
      </div>
    ))}
  </div>
);

const ListBlock = ({ title, items = [] }) => (
  <div>
    <strong>{title}</strong>
    {items.length ? (
      <ul>{items.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
    ) : (
      <div>None</div>
    )}
  </div>
);
