
// src/App.jsx – Definitieve versie met alle functionaliteit
import { useEffect, useState } from "react";
import localforage from "localforage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const trainingTypes = ["Calisthenics", "Strength", "Leg Day 1", "Leg Day 2", "Group Training", "Rest Day"];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [logs, setLogs] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [trainingType, setTrainingType] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [logData, setLogData] = useState({});
  const [form, setForm] = useState({ type: "", category: "", name: "", tempo: "", sets: "", reps: "", weight: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localforage.getItem("trainingLogs").then(setLogs);
    localforage.getItem("workouts").then(setExercises);
  }, []);

  const handleLog = async () => {
    const newEntry = { date, trainingType, logData };
    const updated = [...(logs || []), newEntry];
    await localforage.setItem("trainingLogs", updated);
    setLogs(updated);
    setLogData({});
    alert("Training opgeslagen");
  };

  const filteredExercises = exercises?.filter((e) => e["Training type"] === trainingType);
  const grouped = filteredExercises?.reduce((acc, cur) => {
    acc[cur.Categorie] = acc[cur.Categorie] || [];
    acc[cur.Categorie].push(cur);
    return acc;
  }, {});

  const Dashboard = () => {
    const data = logs.map((entry) => {
      const volume = Object.values(entry.logData || {}).reduce(
        (sum, d) => sum + ((+d.reps || 0) * (+d.weight || 0)),
        0
      );
      return { date: entry.date, volume };
    });

    return (
      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold text-lg mb-2">Dashboard: Volume Progressie</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const ManageWorkouts = () => {
    const save = async () => {
      const newWorkout = {
        "Training type": form.type,
        Categorie: form.category,
        Oefening: form.name,
        Tempo: form.tempo,
        "Aanbevolen sets": form.sets,
        "Aanbevolen reps": form.reps,
        "Aanbevolen gewicht": form.weight,
      };
      let updated = [...(exercises || [])];
      if (editingIndex !== null) updated[editingIndex] = newWorkout;
      else updated.push(newWorkout);
      await localforage.setItem("workouts", updated);
      setExercises(updated);
      setForm({ type: "", category: "", name: "", tempo: "", sets: "", reps: "", weight: "" });
      setEditingIndex(null);
    };

    const edit = (i) => {
      const item = exercises[i];
      setForm({
        type: item["Training type"],
        category: item.Categorie,
        name: item.Oefening,
        tempo: item.Tempo,
        sets: item["Aanbevolen sets"],
        reps: item["Aanbevolen reps"],
        weight: item["Aanbevolen gewicht"],
      });
      setEditingIndex(i);
    };

    const remove = async (i) => {
      const updated = exercises.filter((_, idx) => idx !== i);
      await localforage.setItem("workouts", updated);
      setExercises(updated);
    };

    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Manage Workouts</h2>
        <div className="grid grid-cols-2 gap-2">
          <Select onValueChange={(val) => setForm({ ...form, type: val })}>
            <SelectTrigger>{form.type || "Training Type"}</SelectTrigger>
            <SelectContent>
              {trainingTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Categorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input placeholder="Oefening" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Tempo" value={form.tempo} onChange={(e) => setForm({ ...form, tempo: e.target.value })} />
          <Input placeholder="Sets" value={form.sets} onChange={(e) => setForm({ ...form, sets: e.target.value })} />
          <Input placeholder="Reps" value={form.reps} onChange={(e) => setForm({ ...form, reps: e.target.value })} />
          <Input placeholder="Gewicht" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
        </div>
        <Button onClick={save}>{editingIndex !== null ? "Update" : "Voeg toe"}</Button>
        {exercises?.map((e, i) => (
          <Card key={i}>
            <CardContent className="p-2">
              <div className="font-semibold">{e.Oefening}</div>
              <div className="text-sm text-muted-foreground">
                {e["Training type"]} / {e.Categorie} - {e["Aanbevolen sets"]}x{e["Aanbevolen reps"]} @ {e["Aanbevolen gewicht"]}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => edit(i)}>
                  Bewerk
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(i)}>
                  Verwijder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const LogTraining = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Log Training</h2>
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Select onValueChange={setTrainingType}>
        <SelectTrigger>{trainingType || "Training Type"}</SelectTrigger>
        <SelectContent>
          {trainingTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {trainingType &&
        [...Array(6)].map((_, i) => (
          <Select
            key={i}
            onValueChange={(val) => {
              const copy = [...selectedExercises];
              copy[i] = val;
              setSelectedExercises(copy);
            }}
            disabled={i > 0 && !selectedExercises[i - 1]}
          >
            <SelectTrigger>{selectedExercises[i] || `Oefening ${i + 1}`}</SelectTrigger>
            <SelectContent>
              {Object.entries(grouped || {}).map(([cat, list]) => (
                <SelectGroup key={cat}>
                  <SelectLabel>{cat}</SelectLabel>
                  {list.map((e) => (
                    <SelectItem key={e.Oefening} value={e.Oefening}>
                      {e.Oefening}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        ))}
      {selectedExercises.filter(Boolean).map((name) => {
        const oef = filteredExercises.find((e) => e.Oefening === name);
        return (
          <Card key={name}>
            <CardContent className="space-y-1 p-3">
              <div className="font-semibold">{name}</div>
              <Input placeholder="Sets" onChange={(e) => setLogData((prev) => ({ ...prev, [name]: { ...prev[name], sets: e.target.value } }))} />
              <Input placeholder="Reps" onChange={(e) => setLogData((prev) => ({ ...prev, [name]: { ...prev[name], reps: e.target.value } }))} />
              <Input placeholder="Gewicht" onChange={(e) => setLogData((prev) => ({ ...prev, [name]: { ...prev[name], weight: e.target.value } }))} />
              <Input placeholder="RPE" onChange={(e) => setLogData((prev) => ({ ...prev, [name]: { ...prev[name], rpe: e.target.value } }))} />
              <Input placeholder="RIR" onChange={(e) => setLogData((prev) => ({ ...prev, [name]: { ...prev[name], rir: e.target.value } }))} />
            </CardContent>
          </Card>
        );
      })}
      <Button onClick={handleLog}>Opslaan</Button>
    </div>
  );

  const AllLogs = () => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Alle Logs</h2>
        <Button
          onClick={() => {
            const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `training-log-${new Date().toISOString().split("T")[0]}.json`;
            a.click();
          }}
        >
          Download JSON
        </Button>
      </div>
      {logs.map((entry, i) => (
        <Card key={i}>
          <CardContent className="p-3">
            <div className="font-semibold">
              {entry.date} - {entry.trainingType}
            </div>
            {Object.entries(entry.logData || {}).map(([oef, d], j) => (
              <div key={j} className="text-sm">
                {oef}: {d.sets || "-"} sets, {d.reps || "-"} reps, {d.weight || "-"}kg — RPE {d.rpe || "-"}, RIR {d.rir || "-"}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <div className="flex gap-2 justify-center">
        <Button onClick={() => setPage("dashboard")} variant={page === "dashboard" ? "default" : "ghost"}>
          Dashboard
        </Button>
        <Button onClick={() => setPage("log")} variant={page === "log" ? "default" : "ghost"}>
          Log Training
        </Button>
        <Button onClick={() => setPage("manage")} variant={page === "manage" ? "default" : "ghost"}>
          Manage Workouts
        </Button>
        <Button onClick={() => setPage("logs")} variant={page === "logs" ? "default" : "ghost"}>
          Alle Logs
        </Button>
      </div>
      {page === "dashboard" && <Dashboard />}
      {page === "log" && <LogTraining />}
      {page === "manage" && <ManageWorkouts />}
      {page === "logs" && <AllLogs />}
    </div>
  );
}
