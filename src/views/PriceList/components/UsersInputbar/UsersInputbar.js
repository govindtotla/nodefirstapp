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
			price : {
			  _id: '',
			  lot_number: '',
			  lot_price: ''
			 },
			 openPrice : false
		};
				
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange = event => {			
			const { price } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.price, {[objectSize]: event.target.value }
			);
			this.setState({ price : newInput });
		};
	
	handleSubmit(event) {
		event.preventDefault();
		this.props.onFormSubmit(this.state);
		this.setState({price : {
			  _id: '',
			  lot_number: '',
			  lot_price: ''
			 }});
	}
    
    toggleDrawer = (event) => {
		if(typeof this.props.openPriceHandler !== 'undefined'){
			this.props.openPriceHandler(false);
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
		//console.log(prevProps.price);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.price.lot_number !== this.props.price.lot_number) {
			this.setState({ price : this.props.price });			
		}
		//console.log(prevState.shape);
	}
	  	
	render() {
		const { classes, openPrice, className, ...rest } = this.props;
		const price = this.state.price;
		
		let pageTitle = <h2 id="form-dialog-title">Add Lot Price</h2>;
		let btnTxt = 'Save';
		
		if(price._id) {			
			pageTitle = <h2 id="form-dialog-title">Edit Lot Price</h2>
			btnTxt = 'Update';
		}

		
		return (
			<React.Fragment key="add-color">
			  <Drawer anchor="right" open={openPrice} onClose={this.toggleDrawer}>
				<Card
				  {...rest}
				  className={clsx(classes.root, className)}
				>
				  <CardContent className={classes.content}>
				
					{pageTitle}
					
					<form onSubmit={this.handleSubmit} >
					<form type="hidden" name="_id" value={price._id} />
					  <TextField
						fullWidth
						label="Lot Number"
						name="lot_number"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
						value={price.lot_number}
					  />

					  <TextField
						fullWidth
						label="Price"
						name="lot_price"
						onChange={this.handleChange}
						type="text"
						style={{ marginTop: '1rem' }}
						variant="outlined"
						required
						value={price.lot_price}
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
