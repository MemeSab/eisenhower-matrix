import React from 'react';
import TaskCard from './TaskCard';

const quadrantColors = {
  'Important & Urgent': 'bg-red-100 border-red-300',
  'Important & Not Urgent': 'bg-green-100 border-green-300',
  'Not Important & Urgent': 'bg-blue-100 border-blue-300',
  'Not Important & Not Urgent': 'bg-gray-100 border-gray-300',
};

const Matrix = ({ tasks, onAddTask, onToggleComplete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(tasks).map(([q, taskList]) => (
        <div key={q} className={`rounded border p-4 ${quadrantColors[q]}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{q}</h2>
            <button
              onClick={() => onAddTask(q)}
              className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded"
            >
              + Add
            </button>
          </div>
          <div className="space-y-2">
            {taskList
              .filter((task) => !task.completed) // hide completed tasks
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  completed={task.completed}
                  onToggleComplete={(id) => onToggleComplete(q, id)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matrix;
