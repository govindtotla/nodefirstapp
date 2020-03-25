import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import SaveIcon from '@material-ui/icons/Save';

import {
  Button,
  TextField,  
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper
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
	
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	  };

	const handleClose = () => {
		setOpen(false);
	  };
	  
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    > 
    <div className={classes.row}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>Add New Color</Button>
		</div>
		
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Color</DialogTitle>
        <form
			action='/colors'
			method='post'		
		  >
        <DialogContent>
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
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>          
          <Button
            color="primary"
            variant="outlined"
            type='submit'
            startIcon={<SaveIcon />}
            onClick={handleClose}
          >
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

ColorInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default ColorInput;
