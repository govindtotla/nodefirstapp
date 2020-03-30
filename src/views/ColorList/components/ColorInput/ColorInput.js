import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  row : {
	 alignItems: 'flex-end'
	  }
}));

const ColorInput = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const [state, setState] = React.useState({
    right: false
  });
  
  const toggleDrawer = (anchor, open, data) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open, data });
  };
  
	
  return (
    <Card
		  {...rest}
		  className={clsx(classes.root, className)}
		>
		  <CardContent className={classes.content}>
		
			<h2 id="form-dialog-title">Add Color</h2>
			<form
				action='/colors'
				method='post'		
			  >
			
			  <TextField
				fullWidth
				label="Color Name"
				name="color_name"
				onChange={handleChange}
				type="text"
				variant="outlined"
			  />
			  <TextField
				fullWidth
				label="Color Name Alias"
				name="color_name_alias"
				onChange={handleChange}
				style={{ marginTop: '1rem' }}
				type="text"
				variant="outlined"
			  />
			  
			  <CardActions>
			  <Button onClick={toggleDrawer("add-color", false)} color="primary">
				Cancel
			  </Button>          
			  <Button
				color="primary"
				variant="outlined"
				type='submit'
				startIcon={<SaveIcon />}
			  >
				Save
			  </Button>
			  </CardActions>
			</form>
		</CardContent>
		</Card>
  );
};

ColorInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default ColorInput;
