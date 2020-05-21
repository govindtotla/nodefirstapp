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
			category : {
			  _id: '',
			  name:'',
			  ebay_id: '',
			  store_id: ''
			 },
			 open : false
		};
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = event => {			
			const { category } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.category, {[objectSize]: event.target.value }
			);
			this.setState({ category : newInput });
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
		if (prevProps.category.name !== this.props.category.name) {
			this.setState({ category : this.props.category });			
		}
	}
	  	
	render() {
		const { classes, open, className, ...rest } = this.props;
		const category = this.state.category;
		
		let pageTitle = <h2 id="form-dialog-title">Add Category</h2>;
		let btnTxt = 'Save';
		
		if(category._id) {			
			pageTitle = <h2 id="form-dialog-title">Edit Category</h2>
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
					<form type="hidden" name="_id" value={category._id} />
					  <TextField
						fullWidth
						label="Category Name"
						name="name"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
						value={category.name}
					  />

					  <TextField
						fullWidth
						label="Ebay Id"
						name="ebay_id"
						onChange={this.handleChange}
						type="text"
						style={{ marginTop: '1rem' }}
						variant="outlined"
						required
						value={category.ebay_id}
					  />
					  
					  <TextField
						fullWidth
						label="Store Id"
						name="store_id"
						onChange={this.handleChange}
						type="text"
						style={{ marginTop: '1rem' }}
						variant="outlined"
						required
						value={category.store_id}
					  />

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
