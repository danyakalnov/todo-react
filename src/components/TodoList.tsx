import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { getTasks, deleteTask, toggleTaskStatus } from '../api/todos';
import { Task } from '../types/todos';
import { TodoListItem } from './TodoListItem';
import { CreateTodoItem } from './CreateTodoItem';
import FlipMove from 'react-flip-move';

const useStyles = makeStyles({
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
});

export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const styles = useStyles();

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks ?? []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTodoHandler = async (taskId: string) => {
    const deletionResult = await deleteTask(taskId);
    if (deletionResult) await fetchTasks();
  };

  const toggleTodoHandler = async (taskId: string) => {
    const response = await toggleTaskStatus(taskId);
    if (response !== undefined) await fetchTasks();
  };

  return (
    <div className={styles.todoList}>
      <CreateTodoItem setTasks={setTasks} />
      {tasks.map((task: Task) => (
        <TodoListItem
          taskText={task.taskText}
          isDone={task.isDone}
          id={task.id}
          deleteHandler={deleteTodoHandler}
          toggleHandler={toggleTodoHandler}
          key={task.id}
        />
      ))}
    </div>
  );
};
