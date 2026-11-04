import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

// Full class names (not built dynamically) so Tailwind can detect them
const PRIORITY_BORDER = {
  High: "border-red-500",
  Medium: "border-yellow-400",
  Low: "border-green-500",
};

export default function TaskCard({ task, prevId, nextId, onDelete, onMove, onEdit }) {
  // Local UI state: is this card in edit mode? what is the draft text?
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  // Makes the card draggable. `listeners` go on the handle only.
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const startEdit = () => {
    setDraft(task.text);
    setIsEditing(true);
  };

  const save = () => {
    onEdit(task.id, draft); // App ignores empty text
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-md border-l-4 bg-white p-3 shadow-sm ${
        PRIORITY_BORDER[task.priority]
      } ${isDragging ? "relative z-10 opacity-80 shadow-lg" : ""}`}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          type="button"
          {...listeners}
          {...attributes}
          aria-label="Drag task"
          className="cursor-grab touch-none select-none px-1 text-slate-400 hover:text-slate-700"
        >
          ⠿
        </button>

        {isEditing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
            aria-label="Edit task"
            className="min-w-0 flex-1 rounded border border-slate-300 px-2 py-1"
          />
        ) : (
          <p
            onClick={startEdit}
            title="Click to edit"
            className="min-w-0 flex-1 cursor-text break-words"
          >
            {task.text}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-500">{task.priority} priority</span>
        <div className="flex gap-1">
          {/* Move buttons: fallback for touch screens */}
          {prevId && (
            <button
              type="button"
              onClick={() => onMove(task.id, prevId)}
              aria-label="Move left"
              className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
            >
              ←
            </button>
          )}
          {nextId && (
            <button
              type="button"
              onClick={() => onMove(task.id, nextId)}
              aria-label="Move right"
              className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
            >
              →
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="rounded bg-red-50 px-2 py-1 text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
