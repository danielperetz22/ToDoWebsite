import React, { useState } from 'react';
import Calendar from './Calendar';
import Button from '../ui/botton';
import TaskForm, { type TaskData } from './TaskForm'; // Import TaskData from TaskForm

interface SidebarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onSaveTask?: (task: TaskData) => void;
}

const CalendarSidebar: React.FC<SidebarProps> = ({
  selectedDate,
  onDateChange,
  onSaveTask,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-72 border-l pl-4 flex flex-col gap-6">
      <Calendar
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />

      <div>
        <h2 className="font-semibold mb-4">Calendar Details</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span> Done
          </li>
          <li className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span> Not Done
          </li>
        </ul>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => setIsFormOpen(true)}
        >
          Add New Task
        </Button>
      </div>

      {isFormOpen && (
        <TaskForm 
          selectedDate={selectedDate}
          onClose={() => setIsFormOpen(false)}
          onSave={onSaveTask}
        />
      )}
    </div>
  );
};

export default CalendarSidebar;