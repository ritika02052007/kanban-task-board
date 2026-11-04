import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard.jsx";

export default function Column({
  id,
  title,
  tasks,
  totalCount,
  prevId,
  nextId,
  onDelete,
  onMove,
  onEdit,
}) {
  // Makes this column a drop target. isOver = a card is hovering above it.
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      className={`min-h-[240px] rounded-lg p-3 transition-colors ${
        isOver ? "bg-blue-100" : "bg-slate-200/70"
      }`}
    >
      <h2 className="mb-3 flex items-center justify-between font-semibold">
        {title}
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
          {totalCount}
        </span>
      </h2>

      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            {totalCount === 0 ? "No tasks here yet." : "No tasks found."}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              prevId={prevId}
              nextId={nextId}
              onDelete={onDelete}
              onMove={onMove}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </section>
  );
}
