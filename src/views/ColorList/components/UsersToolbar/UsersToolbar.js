import React, { Component } from 'react';

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
		const { classes, colors, className, ...rest } = this.props;
		const toggleDrawer = (anchor, open, data) => event => {
			if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			  return;
			}
			this.setState({ [anchor]: open, data });
		};
				
		return (
			<div></div>
			);
		};
}



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
