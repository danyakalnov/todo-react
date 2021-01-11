import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { getTasks } from '../api/todos';
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

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks ?? []);
    };
    fetchTasks();
  }, []);

  return (
    <div className={styles.todoList}>
      <CreateTodoList setTasks={setTasks} />
      <FlipMove>
        {tasks.map((task: Task) => (
          <TodoListItem taskText={task.taskText} isDone={task.isDone} key={task.id} />
        ))}
      </FlipMove>
    </div>
  );
};
