import { useEffect, useState } from 'react';
import { useTasks } from 'src/hooks/useTasks';

function App() {
  const { tasks, isLoading, error, getTasks, deleteTask } = useTasks();
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <span>{task.info}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
