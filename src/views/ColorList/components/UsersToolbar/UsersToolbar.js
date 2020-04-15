import React, { Component } from 'react';
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
    }

    getInitialState = () => {		
      const initialState = {
		open : false,
        loading: false,
        edit: false,
        colorData: {
          color_name: "",
          color_alias_name: ""
         }
      };
      return initialState;
    };

    handleChange = event => {
	// This triggers everytime the input is changed
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	
	 handleSubmit = evt => {
		  evt.preventDefault();
		  //making a post request with the fetch API
		  fetch('/api/colors', {
			method: 'POST',
			headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				 color_name:this.state.color_name,
				 color_alias_name:this.state.color_alias_name
			   })
			})
			.then((res) => {
			  res.status === 200 ? res.json() : '';
			  this.setState({ ["add-color"]: false});
			})			
			.then(data => console.log(data))
			.catch(error => console.log(error))
	  };
	
	render() {
		const { classes, className, ...rest } = this.props;
		const toggleDrawer = (anchor, open, data) => event => {
			if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			  return;
			}
			this.setState({ [anchor]: open, data });
		};
				
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
					onClick={toggleDrawer("add-color", true)}
				>Add Color</Button>
			  </div>
			  <div className={classes.row}>
				<SearchInput
				  className={classes.searchInput}
				  placeholder="Search color"
				/>
			  </div>  
			  
			  <div className={classes.row}>
				<React.Fragment key="add-color">
				  <Drawer anchor="right" open={this.state["add-color"]} onClose={toggleDrawer("add-color", false)}>
					<Card
					  {...rest}
					  className={clsx(classes.root, className)}
					>
					  <CardContent className={classes.content}>
					
						<h2 id="form-dialog-title">Add Color</h2>
						<form
							onSubmit={this.handleSubmit}
						  >
						  <TextField
							fullWidth
							label="Color Name"
							name="color_name"
							onChange={this.handleChange}
							type="text"
							variant="outlined"
						  />
						  <TextField
							fullWidth
							label="Color Name Alias"
							name="color_alias_name"
							onChange={this.handleChange}
							style={{ marginTop: '1rem' }}
							type="text"
							variant="outlined"
						  />
						  
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
								onClick={toggleDrawer("add-color", false)}
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
	  spacer: { flexGrow: 1 },
	  importButton: { marginRight: theme.spacing(1) },
	  exportButton: { marginRight: theme.spacing(1) },
	  searchInput: { marginRight: theme.spacing(1) }
	});	
export default withStyles(useStyles)(UsersToolbar);
