import React, { ForwardedRef, forwardRef, useState } from 'react';
import { makeStyles, Typography, Checkbox, TextField, InputAdornment } from '@material-ui/core';
import CheckedCircle from '@material-ui/icons/CheckCircle';
import UncheckedCircle from '@material-ui/icons/RadioButtonUnchecked';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import clsx from 'clsx';
import { TaskEditPayload } from '../types/todos';

interface TodoListItemProps {
  taskText: string;
  isDone: boolean;
  id: string;
  deleteHandler: (taskId: string) => void;
  toggleHandler: (taskId: string) => void;
  editHandler: (payload: TaskEditPayload) => void;
}

type TaskTextProps = {
  isDone: boolean;
};

const useStyles = makeStyles({
  todo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
    minHeight: '32px',
    height: 'auto',
    padding: '12px',
    '&:not(:first-of-type)': {
      marginTop: '12px',
    },
    borderRadius: '16px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(84, 158, 227, 0.8)',
  },
  todoToggleIcon: {
    width: '27px',
    height: '27px',
  },
  todoToggleIconChecked: {
    color: 'rgba(92, 217, 50, 0.8)',
  },
  deleteIcon: {
    width: '29px',
    height: '29px',
    color: 'rgba(225, 70, 47, 0.85)',
    marginLeft: '4px',
    cursor: 'pointer',
  },
  editIcon: {
    color: 'rgba(21, 21, 21, 0.38)',
    cursor: 'pointer',
    marginLeft: '16px',
  },
  newTaskTextField: {
    width: '100%',
  },
  newTaskTextFieldAdornmentIcon: {
    '&:not(:first-of-type)': {
      marginLeft: '16px',
    },
    color: 'rgba(21, 21, 21, 0.38)',
    cursor: 'pointer',
  },
  iconsBlock: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  taskText: (props: TaskTextProps) => ({
    textDecoration: props.isDone ? 'line-through' : 'none',
  }),
});

export const TodoListItem: React.FC<TodoListItemProps> = forwardRef(
  (
    { taskText, isDone, id, deleteHandler, toggleHandler, editHandler },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const styles = useStyles({ isDone });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTaskText, setNewTaskText] = useState<string>(taskText);

    const newTaskTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskText(event.target.value);
    };

    const EditTaskTextField = (
      <TextField
        value={newTaskText}
        type="text"
        multiline
        onChange={newTaskTextHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Clear
                className={styles.newTaskTextFieldAdornmentIcon}
                onClick={() => setIsEditing(false)}
              />
              <Done
                className={styles.newTaskTextFieldAdornmentIcon}
                onClick={async () => {
                  await editHandler({ id, taskText: newTaskText });
                  setIsEditing(false);
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    );

    return (
      <div className={styles.todo} ref={ref}>
        {isEditing ? (
          EditTaskTextField
        ) : (
          <Typography variant="h6" className={styles.taskText}>
            {taskText}
          </Typography>
        )}
        <div className={styles.iconsBlock}>
          <Checkbox
            onClick={() => toggleHandler(id)}
            checked={isDone}
            checkedIcon={
              <CheckedCircle
                className={clsx(styles.todoToggleIconChecked, styles.todoToggleIcon)}
              />
            }
            icon={<UncheckedCircle className={styles.todoToggleIcon} />}
          />
          <DeleteForever className={styles.deleteIcon} onClick={() => deleteHandler(id)} />
          <Edit className={styles.editIcon} onClick={() => setIsEditing(true)} />
        </div>
      </div>
    );
  },
);
