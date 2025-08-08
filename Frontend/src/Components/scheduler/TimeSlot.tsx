// src/Components/scheduler/TimeSlot.tsx
import React from 'react';
import { isSameDay } from 'date-fns';
import type { TaskData } from './TaskForm';

interface TimeSlotProps {
  date: Date;
  hour: string;
  tasks?: TaskData[];
  onTaskClick?: (task: TaskData, taskIndex: number) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ date, hour, tasks = [], onTaskClick }) => {
  // Filter tasks for this time slot
  const slotTasks = tasks?.filter(task => {
    const taskHour = task.time.split(':')[0];
    return isSameDay(task.date, date) && 
           taskHour === hour.split(':')[0];
  });

  return (
    <div className="border-l flex flex-col items-center justify-center h-full p-1 overflow-hidden">
      {slotTasks.map((task, index) => {
        // Find the index of this task in the original tasks array
        const taskIndex = tasks.findIndex(t => 
          t.title === task.title && 
          t.time === task.time && 
          isSameDay(t.date, task.date)
        );
        
        return (
          <div 
            key={index} 
            className={`px-3 py-1 rounded-full text-sm w-full mb-1 truncate cursor-pointer hover:opacity-80
              ${task.status === 'done' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
            title={task.title}
            onClick={() => onTaskClick && onTaskClick(task, taskIndex)}
          >
            {task.title}
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlot;