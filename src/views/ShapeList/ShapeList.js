import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ShapeList = props => {
  const classes = useStyles();

  const shapes = props.shapes;

  return (
    <div className={classes.root}>
      <UsersToolbar />
      
      <div className={classes.content}>
        <UsersTable shapes={shapes} />
      </div>
    </div>
  );
};

export default ShapeList;
