import { useState } from "react";

// Local state: what the user is typing right now
export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    onAdd(text, priority); // tell App to add the task
    setText(""); // clear the input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-wrap gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
        aria-label="New task"
        className="min-w-[180px] flex-1 rounded-md border border-slate-300 bg-white px-3 py-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Priority"
        className="rounded-md border border-slate-300 bg-white px-3 py-2"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
      >
        Add task
      </button>
    </form>
  );
}
