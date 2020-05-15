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
  const stones  = props.preData.stones;
  const faux_list  = props.preData.faux_list;
  const color_list  = props.preData.color_list;
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
			<StoneTable stones={stones} faux_list={faux_list} color_list={color_list} />
		</div>
    </div>
  );
};

export default StoneList;
