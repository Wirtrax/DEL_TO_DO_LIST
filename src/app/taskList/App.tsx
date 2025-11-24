import { useEffect, useState } from 'react';
import Notification from '../../components/Notification/Notification';
import TaskList from './components/TasksList/TaskList';
import CustomLink from 'components/CustomLink/CustomLink';
import { useTasks } from 'src/hooks/useTasks';
import TasksContainer from 'components/TasksContainer/TasksContainer';
import TaskHolder from 'components/TasksContainer/TaskHolder/TaskHolder';
import { SearchInput } from 'components/SearchInput';

function App() {
  return (
    <>
      <TaskList></TaskList>
    </>
  );
}

export default App;
