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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 


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

class CategoryList extends Component {
	
	constructor (props) {
      super();
      this.state = {
		categories : props.categories,
		open : false,
		opendialog : false,
		loading: false,
		edit: false,
		name: "",
		ebay_id: "",
		store_id:"",
		rowsPerPage : 10,
		page : 0,
		selectedUsers : [],
		FilterStr : ""
      };      
    }
    
    handleSelectAll = (event, categories) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = categories.map(category => category._id);
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
		  fetch('/api/categories', {
			method: 'POST',
			headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				 name:this.state.name,
				 ebay_id:this.state.ebay_id,
				 store_id:this.state.store_id
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
	
	 handleClose = () => {
    this.setState({ opendialog : false });
  };
  opendialog = event => {
		this.setState({ opendialog : true });
	};
	handleDelete = event => {
		
		let id = event.currentTarget.dataset.id;		
		//making a post request with the fetch API
		fetch('/api/categories/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				categories: prevState.categories.filter(item => item._id !== id),
				opendialog : false,
			})
					//this.setState({ opendialog : false });	 
			);
		})
		.catch(error => console.log(error))
	};
	
	handleEdit = async(event) => {	
		let id = event.currentTarget.dataset.id;
		//const response = await fetch('/api/categories/' + id)
		//const json = await response.json()
		//making a post request with the fetch API
		fetch('/api/categories/' + id, {
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
				name: data.name,
				ebay_id: data.ebay_id,
				store_id:data.store_id,
				_id: data._id
			});
		});
	};
	/*
	handleEdit = async(event) => {		
		try {
			let id = event.currentTarget.dataset.id;
			const response = await fetch('/api/categories/' + id)
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({
				edit:true,
				open:true,
				name: json.name,
				ebay_id: json.ebay_id,
				store_id: json.store_id,
				_id: json._id
			})
		}
		catch(error) {
			console.error(error)
		}
	};*/
	
	
	 render() {
		
		const { classes, className, ...rest } = this.props;
		const { handleClose, categories, rowsPerPage, page, selectedUsers, FilterStr,opendialog } = this.state;
		
		
		return (
					 
			<div className={classes.root}>
					  
				  <div className={classes.row}>
					<span className={classes.spacer} />
					<Button
						color="primary"
						variant="contained"
						onClick={this.openDrawer}
					>Add Category</Button>
				  </div>
				  <div className={classes.row}>
					<SearchInput
					  className={classes.searchInput}
					  placeholder="Search category"
					  name="FilterStr"
					  onChange={this.handleChange}
					/>
				  </div>
				  
				<React.Fragment key="add-category">
				  <Drawer anchor="right" open={this.state.open} onClose={this.onCloseDrawer}>
					<Card {...rest}>
					  <CardContent className={classes.content}>
						<h2 id="form-dialog-title">Add Category </h2>
						<form
							onSubmit={this.handleSubmit}
						  >
						  <TextField
							fullWidth
							label="Category Name"
							name="name"
							onChange={this.handleChange}
							type="text"
							variant="outlined"
							value={this.state.name}
						  />
						  
						  <TextField
							fullWidth
							label="Ebay id"
							name="ebay_id"
							onChange={this.handleChange}
							style={{ marginTop: '1rem' }}
							type="text"
							variant="outlined"
							value={this.state.ebay_id}
						  />
						  
						  <TextField
							fullWidth
							label="Store id"
							name="store_id"
							onChange={this.handleChange}
							style={{ marginTop: '1rem' }}
							type="text"
							variant="outlined"
							value={this.state.store_id}
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
										  checked={selectedUsers.length === categories.length}
										  color="primary"
										  indeterminate={
											selectedUsers.length > 0 &&
											selectedUsers.length < categories.length
										  }
										  onChange={event => this.handleSelectAll(event, categories)}
										/>
									  </TableCell>
									  <TableCell>Category Name</TableCell>
									  <TableCell>Ebay Id </TableCell>
									  <TableCell>Store Id </TableCell>
									  <TableCell>&nbsp;</TableCell>
									</TableRow>
								  </TableHead>
								  <TableBody>
									{(rowsPerPage > 0
										? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										: categories
									  ).filter(category => String(category.name).toLowerCase().includes(`${FilterStr}`) ).map(category => (
									  <TableRow
										className={classes.tableRow}
										hover
										key={category._id}
										selected={selectedUsers.indexOf(category._id) !== -1}
									  >
										<TableCell padding="checkbox">
										  <Checkbox
											checked={selectedUsers.indexOf(category._id) !== -1}
											category="primary"
											onChange={event => this.handleSelectOne(event, category._id)}
											value="true"
										  />
										</TableCell>
										<TableCell>
										  <div className={classes.nameContainer}>
											<Typography variant="body1">{category.name}</Typography>
										  </div>
										</TableCell>
										<TableCell>
										  {category.ebay_id}
										</TableCell>
										<TableCell>
										  {category.store_id}
										</TableCell>
										<TableCell className={classes.actions}>
										  <Button onClick={this.handleEdit} data-id={category._id} color="primary" variant="contained">
											<EditIcon />
										</Button>
										  &nbsp;&nbsp;
										  									
										
										<Button onClick={this.opendialog}  data-id={category._id} color="primary" variant="contained">
											<DeleteIcon />
										</Button>
										<Dialog
											open={opendialog}
											onClose={handleClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										  >
											<DialogTitle id="alert-dialog-title">{"DELETE?"}</DialogTitle>
											<DialogContent>
											  <DialogContentText id="alert-dialog-description">
												Are you Sure you want to delete this item.
											  </DialogContentText>
											</DialogContent>
											<DialogActions>
											  <Button onClick={this.handleClose} color="primary">
												Disagree
											  </Button>
											  <Button onClick={this.handleDelete} data-id={category._id} color="primary" autoFocus>
												Agree
											  </Button>
											</DialogActions>
										  </Dialog>
										
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
							  count={categories.length}
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

export default withStyles(useStyles)(CategoryList);
