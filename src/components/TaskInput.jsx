import { useState } from "react";

export default function TaskInput({ onClassify }) {
  const [task, setTask] = useState("");

  const handleClassify = async () => {
    const quadrant = "Urgent & Important"; // Replace with API call
    const confidence = (Math.random() * 0.5 + 0.5).toFixed(2);
    onClassify(task, quadrant, confidence);
    setTask("");
  };

  return (
    <div className="p-4 space-y-2">
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Enter a task..."
      />
      <button onClick={handleClassify} className="bg-blue-600 text-white px-4 py-2 rounded">
        Classify Task
      </button>
    </div>
  );
}
