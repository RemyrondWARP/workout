
// App.jsx met seed loader voor eerste keer openen
import { useEffect, useState } from "react";
import localforage from "localforage";
import seed from "../seed_workouts_zeroed.json"; // verwijst naar bestand in je project

export default function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    localforage.getItem("workouts").then((stored) => {
      if (!stored || stored.length === 0) {
        localforage.setItem("workouts", seed).then(() => setWorkouts(seed));
      } else {
        setWorkouts(stored);
      }
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Seed geladen</h1>
      <p>{workouts.length} oefeningen zijn beschikbaar.</p>
    </div>
  );
}
