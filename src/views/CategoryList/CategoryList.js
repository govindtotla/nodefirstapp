import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
//import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CategoryList = props => {
		
  const classes = useStyles();  
  const router  = useRouter();
  const categories  = props.categories;
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };  
  const handleClose = () => {
    setOpen(false);
  };
  
  return ( 
    <div className={classes.root}>		  
		testing
    </div>
  );
};

export default CategoryList;
