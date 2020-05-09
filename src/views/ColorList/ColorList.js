import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { UsersTable } from './components';

import { SearchInput } from '@components';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TablePagination
} from '@material-ui/core';

class ColorList extends Component {
	
	constructor (props) {
      super();
      this.state = {
		colors : props.colors,
		open : false,
		loading: false,
		edit: false,
		color_name: "",
		color_alias_name: "",
		rowsPerPage : 10,
		page : 0,
		selectedUsers : [],
		FilterStr : ""
      };      
    }
    
    handleSelectAll = (event, colors) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = colors.map(color => color._id);
		} else {
			selectedUsers = [];
		}
		this.setState({ selectedUsers : selectedUsers });
	};

  handleSelectOne = (event, id) => {
	let selectedUsers	=	this.state.selectedUsers;
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    this.setState({ selectedUsers : newSelectedUsers });
  };

	handlePageChange = (event, page) => {
		this.setState({ page: page });
	};

	handleRowsPerPageChange = event => {
		this.setState({ rowsPerPage: event.target.value });
	};
	
    handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
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
			  this.setState({ open : false});
			})			
			.then(data => console.log(data))
			.catch(error => console.log(error))
	  };
	 
	onCloseDrawer = event => {
		this.setState({ open : false });
	};
	openDrawer = event => {
		this.setState({ open : true });
	};
	
	handleDelete = event => {
		let id = event.currentTarget.dataset.id;		
		//making a post request with the fetch API
		fetch('/api/colors/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				colors: prevState.colors.filter(item => item._id !== id),
			}));
		})
		.catch(error => console.log(error))
	};
	
	handleEdit = event => {	
		let id = event.currentTarget.dataset.id;
		
		//making a post request with the fetch API
		fetch('/api/colors/' + id, {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  let data = res.json();
		  console.log(data);
			this.setState({
				edit:true,
				open:true,
				color_name: data.color_name,
				color_alias_name: data.color_alias_name,
				_id: data._id
			});
		});
	};
	 render() {
		
		const { classes, className, ...rest } = this.props;
		const { colors, rowsPerPage, page, selectedUsers, FilterStr } = this.state;
		
		return (
					 
			<div className={classes.root}>
					  
				  <div className={classes.row}>
					<span className={classes.spacer} />
					<Button
						color="primary"
						variant="contained"
						onClick={this.openDrawer}
					>Add Color</Button>
				  </div>
				  <div className={classes.row}>
					<SearchInput
					  className={classes.searchInput}
					  placeholder="Search color"
					  name="FilterStr"
					  onChange={this.handleChange}
					/>
				  </div>
				  
				<React.Fragment key="add-color">
				  <Drawer anchor="right" open={this.state.open} onClose={this.onCloseDrawer}>
					<Card {...rest}>
					  <CardContent className={classes.content}>
						<h2 id="form-dialog-title">Add Color </h2>
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
							value={this.state.color_name}
						  />
						  
						  <TextField
							fullWidth
							label="Color Name Alias"
							name="color_alias_name"
							onChange={this.handleChange}
							style={{ marginTop: '1rem' }}
							type="text"
							variant="outlined"
							value={this.state.color_alias_name}
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
								onClick={this.onCloseDrawer}
							  >
								Cancel
							  </Button>
						  </CardActions>
						</form>
					</CardContent>
					</Card>
				  </Drawer>
				</React.Fragment>			           
				
				
				<div className={classes.content}>
					
					<Card {...rest}>
						  <CardContent className={classes.content}>
							<PerfectScrollbar>
							  <div className={classes.inner}>
								<Table>
								  <TableHead>
									<TableRow>
									  <TableCell padding="checkbox">
										<Checkbox
										  checked={selectedUsers.length === colors.length}
										  color="primary"
										  indeterminate={
											selectedUsers.length > 0 &&
											selectedUsers.length < colors.length
										  }
										  onChange={event => this.handleSelectAll(event, colors)}
										/>
									  </TableCell>
									  <TableCell>Color Name</TableCell>
									  <TableCell>Color Alias Name</TableCell>
									  <TableCell>&nbsp;</TableCell>
									</TableRow>
								  </TableHead>
								  <TableBody>
									{(rowsPerPage > 0
										? colors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										: colors
									  ).filter(color => String(color.color_name).toLowerCase().includes(`${FilterStr}`) ).map(color => (
									  <TableRow
										className={classes.tableRow}
										hover
										key={color._id}
										selected={selectedUsers.indexOf(color._id) !== -1}
									  >
										<TableCell padding="checkbox">
										  <Checkbox
											checked={selectedUsers.indexOf(color._id) !== -1}
											color="primary"
											onChange={event => this.handleSelectOne(event, color._id)}
											value="true"
										  />
										</TableCell>
										<TableCell>
										  <div className={classes.nameContainer}>
											<Typography variant="body1">{color.color_name}</Typography>
										  </div>
										</TableCell>
										<TableCell>
										  {color.color_alias_name}
										</TableCell>
										<TableCell className={classes.actions}>
										  <Button onClick={this.handleEdit} data-id={color._id} color="primary" variant="contained">
											<EditIcon />
										</Button>
										  &nbsp;&nbsp;
										  <Button onClick={this.handleDelete} data-id={color._id} color="primary" variant="contained">
											<DeleteIcon />
										</Button>
										
										</TableCell>
									  </TableRow>
									))}
								  </TableBody>
								</Table>
							  </div>
							</PerfectScrollbar>
						  </CardContent>
						  <CardActions className={classes.actions}>
							<TablePagination
							  component="div"
							  count={colors.length}
							  onChangePage={this.handlePageChange}
							  onChangeRowsPerPage={this.handleRowsPerPageChange}
							  page={page}
							  rowsPerPage={rowsPerPage}
							  rowsPerPageOptions={[5, 10, 25]}
							/>
						  </CardActions>
						</Card>
						
				</div>
			</div>
		  )
	}
}

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  row: {
	height: '42px',
	display: 'flex',
	alignItems: 'center',
	marginTop: theme.spacing(1)
  },
  spacer: { flexGrow: 1 },
  importButton: { marginRight: theme.spacing(1) },
  exportButton: { marginRight: theme.spacing(1) },
  searchInput: { marginRight: theme.spacing(1) },
  contentTable: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

export default withStyles(useStyles)(ColorList);
