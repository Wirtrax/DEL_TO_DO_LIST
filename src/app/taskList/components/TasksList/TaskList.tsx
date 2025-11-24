import { useEffect, useMemo, useState } from 'react';
import styles from './TasksListStyle.module.css';
import CustomLink from 'components/CustomLink/CustomLink';
import { SearchInput } from 'components/SearchInput';
import { useTasks } from 'src/hooks/useTasks';
import TasksContainer from 'components/TasksContainer/TasksContainer';
import TaskHolder from 'components/TasksContainer/TaskHolder/TaskHolder';
import { PageContainer } from 'components/PageContainer';

function TaskList() {
  const { tasks, getTasks, deleteTask, updateTask } = useTasks();
  const [valueInput, setValueInput] = useState('');
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filteredTasks = useMemo(() => {
    if (!valueInput.trim()) {
      return tasks;
    }

    const searchTerm = valueInput.toLocaleLowerCase();
    return tasks.filter((task) => task.name?.toLocaleLowerCase().includes(searchTerm));
  }, [tasks, valueInput]);

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };
  const handleUpdateTask = async (id: number) => {
    await updateTask(id, { info: 'ada', name: 'www' });
  };
  return (
    <PageContainer>
      <div>
        <h1 className={styles.title}>TODO LIST</h1>
        <div className={styles.toolbar}>
          <CustomLink to="/" label="New Task" />
          <div>
            <SearchInput value={valueInput} onChange={setValueInput} />
          </div>
        </div>
        <TasksContainer>
          {filteredTasks.map((task) => {
            if (!task.id || !task.info || !task.name) {
              return null;
            }

            return (
              <TaskHolder
                key={task.id}
                label={task.info}
                idTasks={task.id}
                taskName={task.name}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            );
          })}
        </TasksContainer>
      </div>
    </PageContainer>
  );
}

export default TaskList;
