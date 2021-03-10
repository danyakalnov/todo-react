import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    fontSize: '1.3rem',
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e32712',
  },
});

type AlertProps = {
  text: string;
};

export const Alert: React.FC<AlertProps> = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span className={classes.text}>{text}</span>
    </div>
  );
};
