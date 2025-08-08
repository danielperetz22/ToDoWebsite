import Home from './Pages/Home';
import { TaskProvider } from './Context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  )
}

export default App