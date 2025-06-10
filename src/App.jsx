import React, { useEffect, useState } from 'react';
import Matrix from './components/Matrix';
import { fetchJiraTasks } from './services/jiraApi';

const quadrantLabels = [
  'Important & Urgent',
  'Important & Not Urgent',
  'Not Important & Urgent',
  'Not Important & Not Urgent',
];

const App = () => {
  const [tasks, setTasks] = useState({
    'Important & Urgent': [],
    'Important & Not Urgent': [],
    'Not Important & Urgent': [],
    'Not Important & Not Urgent': [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState('');
  const [newTask, setNewTask] = useState({ key: '', summary: '' });

  useEffect(() => {
    fetchJiraTasks().then((jiraTasks) => {
      const mapped = {
        'Important & Urgent': [],
        'Important & Not Urgent': [],
        'Not Important & Urgent': [],
        'Not Important & Not Urgent': [],
      };

      jiraTasks.forEach((task, i) => {
        const quadrant = quadrantLabels[i % 4];
        mapped[quadrant].push({ ...task, completed: false });
      });

      setTasks(mapped);
    });
  }, []);

  const openModal = (quadrant) => {
    setActiveQuadrant(quadrant);
    setNewTask({ key: '', summary: '' });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = () => {
    if (!newTask.key || !newTask.summary) return;
    setTasks((prev) => {
      const updated = { ...prev };
      updated[activeQuadrant] = [
        ...prev[activeQuadrant],
        {
          ...newTask,
          id: `manual-${Date.now()}`,
          completed: false,
        },
      ];
      return updated;
    });
    closeModal();
  };

  const handleToggleComplete = (quadrant, taskId) => {
    setTasks((prev) => {
      const updated = { ...prev };
      updated[quadrant] = updated[quadrant].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Eisenhower Matrix</h1>

      <Matrix
        tasks={tasks}
        onAddTask={openModal}
        onToggleComplete={handleToggleComplete}
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold">Add Task to {activeQuadrant}</h2>

            <input
              type="text"
              placeholder="Task Key"
              className="w-full border px-3 py-2 rounded"
              value={newTask.key}
              onChange={(e) => setNewTask({ ...newTask, key: e.target.value })}
            />

            <input
              type="text"
              placeholder="Task Summary"
              className="w-full border px-3 py-2 rounded"
              value={newTask.summary}
              onChange={(e) => setNewTask({ ...newTask, summary: e.target.value })}
            />

            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
