import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column.jsx";

// Column ids double as task.status values
const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function Board({ tasks, searchQuery, onDelete, onMove, onEdit }) {
  // Drag only starts after moving 5px, so normal clicks still work
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // When a card is dropped on a column, update its status
  const handleDragEnd = ({ active, over }) => {
    if (!over) return; // dropped outside any column
    onMove(active.id, over.id);
  };

  // Filter at render time only. The original array is never changed.
  const query = searchQuery.trim().toLowerCase();
  const visible = query
    ? tasks.filter((t) => t.text.toLowerCase().includes(query))
    : tasks;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {COLUMNS.map((col, index) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={visible.filter((t) => t.status === col.id)}
            totalCount={tasks.filter((t) => t.status === col.id).length}
            prevId={COLUMNS[index - 1]?.id}
            nextId={COLUMNS[index + 1]?.id}
            onDelete={onDelete}
            onMove={onMove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </DndContext>
  );
}
