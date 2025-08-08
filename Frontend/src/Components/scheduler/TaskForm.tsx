import React, { useState } from 'react';
import Button from '../ui/botton';
import { format } from 'date-fns';

interface TaskFormProps {
  selectedDate: Date;
  initialTask?: TaskData;
  onClose: () => void;
  onSave?: (task: TaskData) => void;
}

export interface TaskData {
  title: string;
  description: string;
  date: Date;
  time: string;
  status: 'done' | 'not-done';
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  selectedDate, 
  initialTask,
  onClose,
  onSave 
}) => {
  const [taskData, setTaskData] = useState<TaskData>(() => {
    // Make sure initialTask has a proper Date object if provided
    if (initialTask) {
      return {
        ...initialTask,
        date: initialTask.date instanceof Date ? initialTask.date : new Date(initialTask.date)
      };
    }
    // Otherwise create a new default task
    return {
      title: '',
      description: '',
      date: selectedDate,
      time: format(new Date(), 'HH:mm'),
      status: 'not-done',
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we have a valid date object before saving
    const validTaskData = {
      ...taskData,
      // Ensure date is a Date object
      date: taskData.date instanceof Date ? taskData.date : new Date(taskData.date),
    };
    
    console.log('Saving task:', validTaskData);
    
    if (onSave) {
      onSave(validTaskData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={taskData.date ? format(taskData.date, 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      if (dateValue) {
                        const newDate = new Date(dateValue);
                        // Set the time to noon to avoid timezone issues
                        newDate.setHours(12, 0, 0, 0);
                        if (!isNaN(newDate.getTime())) {
                          setTaskData(prev => ({ ...prev, date: newDate }));
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    {taskData.date ? format(taskData.date, 'EEEE, MMMM d, yyyy') : ''}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={taskData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="not-done">Not Done</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;