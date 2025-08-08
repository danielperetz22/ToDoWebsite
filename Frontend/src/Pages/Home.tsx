// src/Pages/Home.tsx
import React, { useState } from 'react';
import WeeklyCalendar from '../Components/scheduler/WeeklyCalendar';
import CalendarSidebar from '../Components/scheduler/CalendarSidebar';
import { useTasks } from '../Context/TaskContext';

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks, addTask, updateTask } = useTasks();

  return (
    <div className="flex min-h-screen p-4 gap-4 bg-white text-black">
      <WeeklyCalendar 
        selectedDate={selectedDate} 
        tasks={tasks}
        onTaskUpdate={updateTask}
      />
      <CalendarSidebar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onSaveTask={addTask}
      />
    </div>
  );
};

export default Home;