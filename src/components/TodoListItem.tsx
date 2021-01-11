import React, { ForwardedRef, forwardRef } from 'react';
import { makeStyles, Typography, Checkbox } from '@material-ui/core';
import CheckedCircle from '@material-ui/icons/CheckCircle';
import UncheckedCircle from '@material-ui/icons/RadioButtonUnchecked';
import DeleteForever from '@material-ui/icons/DeleteForever';
import clsx from 'clsx';

interface TodoListItemProps {
  taskText: string;
  isDone: boolean;
  id: string;
  deleteHandler: (taskId: string) => void;
  toggleHandler: (taskId: string) => void;
}

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
    color: 'rgba(237, 70, 47, 0.9)',
    marginLeft: '4px',
  },
  iconsBlock: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
});

export const TodoListItem: React.FC<TodoListItemProps> = forwardRef(
  ({ taskText, isDone, id, deleteHandler, toggleHandler }, ref: ForwardedRef<HTMLDivElement>) => {
    const styles = useStyles();

    return (
      <div className={styles.todo} ref={ref}>
        <Typography variant="h6">{taskText}</Typography>
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
        </div>
      </div>
    );
  },
);
