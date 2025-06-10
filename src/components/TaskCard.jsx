import React from 'react';

const TaskCard = ({ task, completed, onToggleComplete }) => {
  if (completed) return null;

  return (
    <div className="bg-white p-3 rounded border shadow-sm flex items-start gap-2">
      <input
        type="checkbox"
        onChange={() => onToggleComplete(task.key)}
        className="mt-1"
      />
      <div>
        <p className="text-sm font-semibold">{task.key}</p>
        <p className="text-sm">{task.summary}</p>
      </div>
    </div>
  );
};

export default TaskCard;
