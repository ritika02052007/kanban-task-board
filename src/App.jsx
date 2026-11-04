import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Board from "./components/Board.jsx";

const STORAGE_KEY = "kanban-tasks";

// Runs only once (lazy initial state). Reads saved tasks from localStorage.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return []; // corrupted JSON or storage blocked -> start empty
  }
}

export default function App() {
  // ALL tasks live here, in one array
  const [tasks, setTasks] = useState(loadTasks);
  // Text typed in the search box
  const [searchQuery, setSearchQuery] = useState("");

  // Save to localStorage every time `tasks` changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or blocked - ignore */
    }
  }, [tasks]);

  // ---- Handler functions (children call these via props) ----

  const addTask = (text, priority) => {
    const clean = text.trim();
    if (!clean) return; // ignore empty / whitespace
    const newTask = {
      id: crypto.randomUUID(),
      text: clean,
      priority,
      status: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const editTask = (id, newText) => {
    const clean = newText.trim();
    if (!clean) return; // never save empty text
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: clean } : t))
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="mx-auto mb-6 max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add a task, drag it across columns, and it stays saved after refresh.
        </p>
      </header>

      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <AddTaskForm onAdd={addTask} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <Board
        tasks={tasks}
        searchQuery={searchQuery}
        onDelete={deleteTask}
        onMove={moveTask}
        onEdit={editTask}
      />
    </div>
  );
}
