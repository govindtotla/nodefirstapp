import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import mockData from './data';

import { UsersToolbar, UsersTable, ColorInput } from './components';
/* import * as fetch from 'isomorphic-fetch'   import fetch from 'isomorphic-unfetch'; */
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ColorList = props => {
		
  const classes = useStyles();  
  const router = useRouter();
  const colors = props.colors;
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
			<UsersTable colors={colors} />
		</div>
    </div>
  );
};

export default ColorList;
