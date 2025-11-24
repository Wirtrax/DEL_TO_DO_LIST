import React from 'react';
import styles from './TasksContainer.module.css';

interface TasksContainerProps {
  children: React.ReactNode;
}

const TasksContainer: React.FC<TasksContainerProps> = ({ children }) => {
  return <section className={styles.tasksContainer}>{children}</section>;
};

export default TasksContainer;
