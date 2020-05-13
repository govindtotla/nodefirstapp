import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

class UsersInputbar extends Component {
		
	constructor (props) {
		super(props);
		this.state = {
			shape : {
			  _id: '',
			  shape_name: '',
			  if_ebay: ''
			 },
			 open : false
		};
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
    /*handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};*/
	
	handleChange = event => {			
			const { shape } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.shape, {[objectSize]: event.target.value }
			);
			this.setState({ shape : newInput });
		};
	
	handleSubmit(event) {
		event.preventDefault();
		this.props.onFormSubmit(this.state);
		//this.setState(this.initialState);
	}
    
    toggleDrawer = (event) => {
		if(typeof this.props.openHandler !== 'undefined'){
			this.props.openHandler(false);
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.shape);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.shape.shape_name !== this.props.shape.shape_name) {
			this.setState({ shape : this.props.shape });			
		}
		//console.log(prevState.shape);
	}

	
	
	
	  	
	render() {
		const { classes, open, className, ...rest } = this.props;
		const shape = this.state.shape;
		
		let pageTitle = <h2 id="form-dialog-title">Add Stone Shape</h2>;
		let btnTxt = 'Save';
		
		if(shape._id) {			
			pageTitle = <h2 id="form-dialog-title">Edit Stone Shape</h2>
			btnTxt = 'Update';
		}

		
		return (
			<React.Fragment key="add-color">
			  <Drawer anchor="right" open={open} onClose={this.toggleDrawer}>
				<Card
				  {...rest}
				  className={clsx(classes.root, className)}
				>
				  <CardContent className={classes.content}>
				
					{pageTitle}
					
					<form onSubmit={this.handleSubmit} >
					<form type="hidden" name="_id" value={shape._id} />
					  <TextField
						fullWidth
						label="Shape Name"
						name="shape_name"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
						value={shape.shape_name}
					  />
					  
					  <TextField
						fullWidth
						select
						label="If Ebay"
						name="if_ebay"
						onChange={this.handleChange}
						style={{ marginTop: '1rem' }}
						variant="outlined"
						SelectProps={{ native: true }}
						required
						value={shape.if_ebay}
					  >
					  
					  {this.props.if_ebay_val.map(option => (
						  <option
							key={option.value}
							value={option.value}
						  >
							{option.label}
						  </option>
						))}
					  </TextField>
					  
					  <CardActions>
						  <Button
							color="primary"
							variant="contained"
							type='submit'
							startIcon={<SaveIcon />}
						  >
							{btnTxt}
						  </Button>							  
						  <Button
							color="secondary"
							variant="contained"
							onClick={this.toggleDrawer}
						  >
							Cancel
						  </Button>
					  </CardActions>
					</form>
				</CardContent>
				</Card>
			  </Drawer>
			</React.Fragment>
			);
		};
}

UsersInputbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const useStyles = theme => ({
	  root: {},
	  row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	  },
	  content: {marginTop: theme.spacing(2)},
	  spacer: { flexGrow: 1 },
	  importButton: { marginRight: theme.spacing(1) },
	  exportButton: { marginRight: theme.spacing(1) },
	  searchInput: { marginRight: theme.spacing(1) }
	});	
export default withStyles(useStyles)(UsersInputbar);
