// No state here. The value lives in App (lifted up).
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks..."
      aria-label="Search tasks"
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 lg:w-64"
    />
  );
}
