import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import TimeSlot from './TimeSlot';
import TaskForm from './TaskForm';
import type { TaskData } from './TaskForm'; 

interface WeeklyProps {
  selectedDate: Date;
  tasks?: TaskData[];
  onTaskUpdate?: (taskIndex: number, updatedTask: TaskData) => void;
}

const WeeklyCalendar: React.FC<WeeklyProps> = ({ selectedDate, tasks, onTaskUpdate }) => {
  const [editingTask, setEditingTask] = useState<{ task: TaskData; index: number } | null>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Scroll to current time when component mounts
  React.useEffect(() => {
    if (calendarRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Find the element for the current hour
      const hourElement = calendarRef.current.querySelector(`[data-hour="${String(currentHour).padStart(2, '0')}:00"]`);
      
      if (hourElement) {
        // Scroll to the current hour with some offset
        hourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, []);

  const handleTaskClick = (task: TaskData, taskIndex: number) => {
    setEditingTask({ task, index: taskIndex });
  };

  const handleTaskUpdate = (updatedTask: TaskData) => {
    if (editingTask && onTaskUpdate) {
      onTaskUpdate(editingTask.index, updatedTask);
    }
    setEditingTask(null);
  };
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = addDays(weekStart, 6);
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );
  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  return (
    <div ref={calendarRef} className="flex-1 overflow-y-auto overflow-x-auto h-[calc(100vh-120px)]">
      {/* week range */}
      <div className="mb-4 text-lg font-semibold">
        {format(weekStart, 'MMMM d')} – {format(weekEnd, 'd')}
      </div>

      {/* header row */}
      <div className="grid grid-cols-8 border-b font-semibold">
        <div className="pl-2 py-2">Time</div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className="flex flex-col items-center py-2 border-l"
          >
            <span>{format(day, 'd')}</span>
            <span className="text-xs text-gray-600">
              {format(day, 'EEE')}
            </span>
          </div>
        ))}
      </div>

      {/* time slots */}
      {hours.map((hour) => {
        // Determine if this is a major hour (divisible by 6)
        const isMajorHour = parseInt(hour) % 6 === 0;
        
        return (
          <div
            key={hour}
            data-hour={hour}
            className={`grid grid-cols-8 border-t items-center ${isMajorHour ? 'h-20 bg-gray-50' : 'h-16'}`}
          >
            <div className={`text-right pr-2 ${isMajorHour ? 'font-semibold' : 'text-sm text-gray-600'}`}>
              {hour}
            </div>
            {days.map((day) => (
              <TimeSlot
                key={`${day.toString()}-${hour}`}
                date={day}
                hour={hour}
                tasks={tasks}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
        );
      })}
      
      {/* Edit Task Modal */}
      {editingTask && (
        <TaskForm
          selectedDate={editingTask.task.date}
          initialTask={editingTask.task}
          onClose={() => setEditingTask(null)}
          onSave={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;