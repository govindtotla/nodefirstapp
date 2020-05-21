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
			brand : {
			  _id: '',
			  brand_name: '',
			  brand_short_code: ''
			 },
			 open : false
		};
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = event => {			
			const { brand } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.brand, {[objectSize]: event.target.value }
			);
			this.setState({ brand : newInput });
		};
	
	handleSubmit(event) {
		event.preventDefault();
		this.props.onFormSubmit(this.state);
		this.setState({
				brand : {
					  _id: '',
					  brand_name: '',
					  brand_short_code: ''
					 }
				});
	}
    
    toggleDrawer = (event) => {
		if(typeof this.props.openHandler !== 'undefined'){
			this.props.openHandler(false);
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.brand);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.brand.brand_name !== this.props.brand.brand_name) {
			this.setState({ brand : this.props.brand });			
		}
		//console.log(prevState.shape);
	}
	  	
	render() {
		const { classes, open, className, ...rest } = this.props;
		const brand = this.state.brand;
		
		let pageTitle = <h2 id="form-dialog-title">Add Brand</h2>;
		let btnTxt = 'Save';
		
		if(brand._id) {			
			pageTitle = <h2 id="form-dialog-title">Edit Brand</h2>
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
					<form type="hidden" name="_id" value={brand._id} />
					  <TextField
						fullWidth
						label="Brand Name"
						name="brand_name"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
						value={brand.brand_name}
					  />

					  <TextField
						fullWidth
						label="Brand Short Code"
						name="brand_short_code"
						onChange={this.handleChange}
						type="text"
						style={{ marginTop: '1rem' }}
						variant="outlined"
						required
						value={brand.brand_short_code}
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
