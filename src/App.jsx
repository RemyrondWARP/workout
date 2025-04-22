
// App.jsx zonder externe UI component imports
import { useState, useEffect } from "react";
import localforage from "localforage";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    localforage.getItem("trainingLogs").then((logs) => {
      setLogs(logs || []);
      const transformed = (logs || []).map((entry) => {
        const volume = Object.values(entry.logData || {}).reduce((sum, l) => {
          return sum + ((+l.reps || 0) * (+l.weight || 0));
        }, 0);
        return { date: entry.date, volume };
      });
      setData(transformed);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <nav className="flex gap-4 mb-6 justify-center">
        {["dashboard", "log", "manage", "logs"].map((p) => (
          <button
            key={p}
            className={`px-4 py-2 border rounded ${page === p ? "bg-black text-white" : "bg-gray-100"}`}
            onClick={() => setPage(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>

      {page === "dashboard" && (
        <div>
          <h2 className="text-lg font-bold mb-4">Dashboard (Placeholder)</h2>
          {data.length === 0 ? (
            <p className="text-gray-600">Nog geen trainingsdata.</p>
          ) : (
            <ul className="space-y-2">
              {data.map((d, i) => (
                <li key={i} className="border rounded p-2">
                  <strong>{d.date}</strong>: totaal volume = {d.volume}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {page === "logs" && (
        <div>
          <h2 className="text-lg font-bold mb-4">Alle Trainingslogs</h2>
          {logs.map((entry, i) => (
            <div key={i} className="border rounded p-3 mb-3">
              <div className="font-semibold mb-1">{entry.date} — {entry.trainingType}</div>
              <ul className="text-sm space-y-1">
                {Object.entries(entry.logData || {}).map(([name, log], j) => (
                  <li key={j}>
                    {name}: {log.sets} sets × {log.reps} reps @ {log.weight}kg — RPE {log.rpe}, RIR {log.rir}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
