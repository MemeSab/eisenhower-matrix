import React, { useEffect, useState } from 'react';
import Matrix from './components/Matrix';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { db } from './firebase';
import { ref, set, get } from 'firebase/database';

const LOCAL_STORAGE_KEY = 'eisenhower_tasks';

const App = () => {
  const [tasks, setTasks] = useState({
    'Important & Urgent': [],
    'Important & Not Urgent': [],
    'Not Important & Urgent': [],
    'Not Important & Not Urgent': [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState('');
  const [newTask, setNewTask] = useState({ key: '', summary: '', label: '', due: '' });
  const [showCompleted, setShowCompleted] = useState(false);
  const [search, setSearch] = useState('');
  const [labelFilter, setLabelFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      const snapshot = await get(ref(db, 'matrix'));
      if (snapshot.exists()) {
        setTasks(snapshot.val());
      }
    };
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    set(ref(db, 'matrix'), tasks);
  }, [tasks]);

  const openModal = (quadrant) => {
    setActiveQuadrant(quadrant);
    setNewTask({ key: '', summary: '', label: '', due: '' });
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

  const handleDeleteTask = (quadrant, taskId) => {
    setTasks((prev) => {
      const updated = { ...prev };
      updated[quadrant] = updated[quadrant].filter(task => task.id !== taskId);
      return updated;
    });
  };

  const handleEditTask = (quadrant, taskId, newSummary) => {
    setTasks((prev) => {
      const updated = { ...prev };
      updated[quadrant] = updated[quadrant].map(task =>
        task.id === taskId ? { ...task, summary: newSummary } : task
      );
      return updated;
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceList = Array.from(tasks[source.droppableId]);
    const [moved] = sourceList.splice(source.index, 1);

    const destList = Array.from(tasks[destination.droppableId]);
    destList.splice(destination.index, 0, moved);

    setTasks(prev => ({
      ...prev,
      [source.droppableId]: source.droppableId === destination.droppableId ? destList : sourceList,
      ...(source.droppableId !== destination.droppableId && {
        [destination.droppableId]: destList
      }),
    }));
  };

  const handleExportPDF = () => {
    const matrix = document.querySelector('.matrix-wrapper');
    if (!matrix) return;

    html2canvas(matrix).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('eisenhower-matrix.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Eisenhower Matrix</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tasks or labels..."
          className="border px-3 py-1 text-sm rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by label"
          className="border px-3 py-1 text-sm rounded w-full sm:w-1/4"
          value={labelFilter}
          onChange={(e) => setLabelFilter(e.target.value)}
        />
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-sm px-3 py-1 bg-yellow-200 text-yellow-800 rounded"
        >
          {showCompleted ? 'Hide' : 'Show'} Completed
        </button>
        <button
          onClick={handleExportPDF}
          className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
        >
          📄 Export to PDF
        </button>
      </div>

      <div className="matrix-wrapper">
        <Matrix
          tasks={tasks}
          onAddTask={openModal}
          onToggleComplete={handleToggleComplete}
          showCompleted={showCompleted}
          onDragEnd={handleDragEnd}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          search={search}
          labelFilter={labelFilter}
        />
      </div>

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
            <input
              type="text"
              placeholder="Label"
              className="w-full border px-3 py-2 rounded"
              value={newTask.label}
              onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
            />
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
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
