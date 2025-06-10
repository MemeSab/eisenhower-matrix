import React, { useState } from 'react';
import dayjs from 'dayjs';

const TaskCard = ({
  task,
  quadrant,
  onToggleComplete,
  onDeleteTask,
  onEditTask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSummary, setEditSummary] = useState(task.summary);

  const isOverdue = task.due && !task.completed && dayjs(task.due).isBefore(dayjs(), 'day');

  const handleSaveEdit = () => {
    if (editSummary.trim()) {
      onEditTask(quadrant, task.id, editSummary);
      setIsEditing(false);
    }
  };

  return (
    <div className={`bg-white p-3 rounded shadow border flex justify-between items-start space-x-2 ${isOverdue ? 'border-red-500' : ''}`}>
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(quadrant, task.id)}
          className="mt-1"
        />
        <div>
          {isEditing ? (
            <>
              <input
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
                className="border px-2 py-1 text-sm rounded w-full"
              />
              <div className="flex space-x-2 mt-1">
                <button onClick={handleSaveEdit} className="text-blue-600 text-sm">Save</button>
                <button onClick={() => setIsEditing(false)} className="text-gray-600 text-sm">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.summary}
              </p>
              {task.label && (
                <span className="text-xs text-white bg-gray-600 px-2 py-1 rounded mr-2">
                  {task.label}
                </span>
              )}
              {task.due && (
                <p className={`text-xs mt-1 ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                  Due: {dayjs(task.due).format('DD MMM YYYY')}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} className="text-xs text-blue-600">✏️</button>
            <button onClick={() => onDeleteTask(quadrant, task.id)} className="text-xs text-red-600">🗑</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
