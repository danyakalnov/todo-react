import React, { useState, useCallback } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { createTask, getTasks } from '../api/todos';
import { Task } from '../types/todos';

interface CreateTodoListProps {
  setTasks: (value: Array<Task> | ((prevState: Array<Task>) => Array<Task>)) => void;
}

const useStyles = makeStyles({
  createTodo: {
    width: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    margin: '8px 0',
  },
  newTaskTextField: {
    width: '100%',
    marginRight: '24px',
  },
  addNewTaskButton: {
    position: 'relative',
    top: '8px',
  },
});

export const CreateTodoItem: React.FC<CreateTodoListProps> = ({ setTasks }) => {
  const styles = useStyles();

  const [newTaskText, setNewTaskText] = useState<string>('');

  const newTaskTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  };

  const newTodoSubmitHandler = useCallback(async () => {
    if (newTaskText.length !== 0) {
      await createTask({ taskText: newTaskText });
      const newTasks = await getTasks();
      setTasks(newTasks as Array<Task>);
      setNewTaskText('');
    }
  }, [newTaskText]);

  return (
    <div className={styles.createTodo}>
      <TextField
        className={styles.newTaskTextField}
        label="Новое задание"
        type="text"
        id="newTaskTextInput"
        value={newTaskText}
        onChange={newTaskTextHandler}
      />
      <Button className={styles.addNewTaskButton} onClick={newTodoSubmitHandler}>
        Добавить
      </Button>
    </div>
  );
};
