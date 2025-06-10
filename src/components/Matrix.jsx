import React from 'react';
import TaskCard from './TaskCard';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

const quadrantColors = {
  'Important & Urgent': 'bg-red-100 border-red-300',
  'Important & Not Urgent': 'bg-green-100 border-green-300',
  'Not Important & Urgent': 'bg-blue-100 border-blue-300',
  'Not Important & Not Urgent': 'bg-gray-100 border-gray-300',
};

const Matrix = ({
  tasks,
  onAddTask,
  onToggleComplete,
  showCompleted,
  onDragEnd,
  onDeleteTask,
  onEditTask,
  search,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(tasks).map(([quadrant, taskList]) => {
          const filteredTasks = taskList.filter((task) => {
            const matchesSearch =
              !search ||
              task.summary.toLowerCase().includes(search.toLowerCase()) ||
              (task.label && task.label.toLowerCase().includes(search.toLowerCase()));
            return matchesSearch && (showCompleted || !task.completed);
          });

          return (
            <div key={quadrant} className={`rounded border p-4 ${quadrantColors[quadrant]}`}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{quadrant}</h2>
                <button
                  onClick={() => onAddTask(quadrant)}
                  className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded"
                >
                  + Add
                </button>
              </div>

              <Droppable droppableId={quadrant}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 min-h-[40px]"
                  >
                    {filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              quadrant={quadrant}
                              onToggleComplete={onToggleComplete}
                              onDeleteTask={onDeleteTask}
                              onEditTask={onEditTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Matrix;
