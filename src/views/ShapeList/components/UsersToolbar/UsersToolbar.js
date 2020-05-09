import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { SearchInput } from '@components';
import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

class UsersToolbar extends Component {
		
	constructor (props) {
      super();
      this.state = this.getInitialState();
      this.state.shapes	=	props.shapes;
    }

    getInitialState = () => {		
      const initialState = {
		ShowForm : false,
        edit: false,      
		shape_name: "",
		if_ebay: "",       
         if_ebay_val : [
			{value: '1', label: 'Yes'},
			{value: '0', label: 'No' }
		  ]
      };
      return initialState;
    };

    handleChange = event => {
	// This triggers everytime the input is changed
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	
	handleCloseDrawer = () => {
      this.setState({ ShowForm : false});
    }
    
	handleDrawerOpen = () => {
      this.setState({ ShowForm : true});
    }
    
	SearchShape = event => {
		let strin	=	event.target.value;
		
		console.log(strin);
		this.setState((prevState) => ({
			shapes: prevState.shapes.filter(shape => shape.if_ebay == 0),
		}));
    }
	
	 handleSubmit = evt => {
		  evt.preventDefault();
		  //making a post request with the fetch API
		  fetch('/api/shapes', {
			method: 'POST',
			headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				 shape_name:this.state.shape_name,
				 if_ebay:this.state.if_ebay
			   })
			})
			.then((res) => {
			  res.status === 200 ? res.json() : '';
			  this.fetchShapes();
			  this.setState({ ShowForm : false});
			})			
			.then(data => console.log(data))
			.catch(error => console.log(error))
	  };
	  	
	render() {
		const { classes, className, ...rest } = this.props;
		
		return (
			<div		 
			  className={clsx(classes.root, className)}
			>
			  <div className={classes.row}>
				<span className={classes.spacer} />
				<Button className={classes.importButton}>Import</Button>
				<Button className={classes.exportButton}>Export</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={this.handleDrawerOpen}
				>Add Stone Shape</Button>
			  </div>
			  <div className={classes.row}>
				<SearchInput
				  className={classes.searchInput}
				  placeholder="Search Shape"
				  onChange={this.SearchShape}
				/>
			  </div>
			  
			<React.Fragment key="add-color">
			  <Drawer anchor="right" open={this.state.ShowForm} onClose={this.handleCloseDrawer}>
				<Card
				  {...rest}
				  className={clsx(classes.root, className)}
				>
				  <CardContent className={classes.content}>
				
					<h2 id="form-dialog-title">Add Stone Shape</h2>
					
					<form
						onSubmit={this.handleSubmit}
					  >
					  <TextField
						fullWidth
						label="Shape Name"
						name="shape_name"
						onChange={this.handleChange}
						type="text"
						variant="outlined"
						required
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
					  >
					  
					  {this.state.if_ebay_val.map(option => (
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
							Save
						  </Button>							  
						  <Button
							color="secondary"
							variant="contained"
							onClick={this.handleCloseDrawer}
						  >
							Cancel
						  </Button>
					  </CardActions>
					</form>
				</CardContent>
				</Card>
			  </Drawer>
			</React.Fragment>			           
			</div>
			);
		};
}

UsersToolbar.propTypes = {
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
export default withStyles(useStyles)(UsersToolbar);
