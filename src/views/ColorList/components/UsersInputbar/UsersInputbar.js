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
			color : {
			  _id: '',
			  color_name: '',
			  color_alias_name: ''
			 },
			 open : false
		};
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = event => {			
			const { color } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.color, {[objectSize]: event.target.value }
			);
			this.setState({ color : newInput });
		};
	
	handleSubmit(event) {
		event.preventDefault();
		this.props.onFormSubmit(this.state);
		this.setState({color : {
			  _id: '',
			  color_name: '',
			  color_alias_name: ''
			 }});
	}
    
    toggleDrawer = (event) => {
		if(typeof this.props.openHandler !== 'undefined'){
			this.props.openHandler(false);
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.color);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.color.color_name !== this.props.color.color_name) {
			this.setState({ color : this.props.color });			
		}
		//console.log(prevState.shape);
	}
	  	
	render() {
		const { classes, open, className, ...rest } = this.props;
		const color = this.state.color;
		
		let pageTitle = <h2 id="form-dialog-title">Add Color</h2>;
		let btnTxt = 'Save';
		
		if(color._id) {			
			pageTitle = <h2 id="form-dialog-title">Edit Color</h2>
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
					<form type="hidden" name="_id" value={color._id} />
					  <TextField
						fullWidth
						label="Color Name"
						name="color_name"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
						value={color.color_name}
					  />

					  <TextField
						fullWidth
						label="Color Name"
						name="color_alias_name"
						onChange={this.handleChange}
						type="text"
						style={{ marginTop: '1rem' }}
						variant="outlined"
						required
						value={color.color_alias_name}
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
