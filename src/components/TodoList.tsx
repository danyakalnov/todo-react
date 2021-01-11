import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { getTasks, deleteTask } from '../api/todos';
import { Task } from '../types/todos';
import { TodoListItem } from './TodoListItem';
import { CreateTodoList } from './CreateTodoItem';
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

  return (
    <div className={styles.todoList}>
      <CreateTodoList setTasks={setTasks} />
      <FlipMove>
        {tasks.map((task: Task) => (
          <TodoListItem
            taskText={task.taskText}
            isDone={task.isDone}
            id={task.id}
            deleteHandler={deleteTodoHandler}
            key={task.id}
          />
        ))}
      </FlipMove>
    </div>
  );
};
