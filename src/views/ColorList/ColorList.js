import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable, ColorInput } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ColorList = () => {
  const classes = useStyles();
  
  const router = useRouter();

  const [users] = useState(mockData);
  
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  
  
  return (
    <div className={classes.root}>    
		<UsersToolbar />
		
		
		<div className={classes.content}>
			<UsersTable users={users} />
		</div>
    </div>
  );
};

export default ColorList;
