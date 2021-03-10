import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto',
  },
  container: {
    display: 'flex',
    padding: '2rem',
    borderRadius: '15px',
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
