import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { TaskData } from "../Components/scheduler/TaskForm";

// Define the context shape
interface TaskContextType {
  tasks: TaskData[];
  addTask: (task: TaskData) => void;
  updateTask: (index: number, task: TaskData) => void;
  deleteTask: (index: number) => void;
}

// Create the context with a more explicit approach
const initialContext: TaskContextType = {
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
};

export const TaskContext = createContext<TaskContextType>(initialContext);

// Key for sessionStorage
const TASKS_STORAGE_KEY = "todoWebsiteTasksData";

// Provider component without using React.FC
export function TaskProvider({ children }: { children: ReactNode }) {
  // Initialize state from sessionStorage if available
  const [tasks, setTasks] = useState<TaskData[]>(() => {
    try {
      // Try to get tasks from sessionStorage
      const storedTasks = sessionStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        // Convert string dates back to Date objects
        return parsedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date)
        }));
      }
    } catch (error) {
      console.error("Error loading tasks from sessionStorage:", error);
    }
    return [];
  });

  // Save tasks to sessionStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to sessionStorage:", error);
    }
  }, [tasks]);

  const addTask = (task: TaskData) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (index: number, task: TaskData) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = task;
      return newTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Create the context value object
  const contextValue: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}

// Hook to use the context
export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
