import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { StoneToolbar, StoneTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const StoneList = props => {
		
  const classes = useStyles();  
  const router  = useRouter();
  const stones  = props.stones;
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };  
  const handleClose = () => {
    setOpen(false);
  };
  
  return ( 
    <div className={classes.root}>		  
		<StoneToolbar />
		
		<div className={classes.content}>
			<StoneTable stones={stones} />
		</div>
    </div>
  );
};

export default StoneList;
