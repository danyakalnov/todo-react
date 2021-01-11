import React from 'react';
import ReactDOM from 'react-dom';
import { TodoList } from './components/TodoList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    background: 'linear-gradient(0deg, rgba(162,227,228,1) 0%, rgba(157,187,226,1) 63%)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const App: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
