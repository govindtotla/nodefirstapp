import React, { useState, Component } from 'react';
import clsx from 'clsx';
import Router from 'next/router'
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';


import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from '@material-ui/core';


class UsersTable extends Component {
	
	constructor (props) {		
		super();
		this.state = {			
			rowsPerPage : 10,
			page : 0,
			selectedUsers : [],		
			categories : []
      };
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.categories !== this.props.categories) {
			this.setState({ categories : this.props.categories });			
		}
	}

    componentDidMount(){
		this.props.fetchTable();
	};

    handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};  
  
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
	 
	
	handleDelete = event => {
		let id = event.currentTarget.dataset.id;
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
			  
			  console.log(id);
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
					}));
					
					Swal.fire(
						  'Deleted!',
						  'Your Entry has been deleted.',
						  'success'
						);				
				})
				.catch(error => console.log(error))
		  }
		});
	};  
  
  render() {
		const { className, selectedValue, classes, ...rest } = this.props;
		const { categories, rowsPerPage, page, selectedUsers, deleteDialog } = this.state;
		
		const filteredCategories = categories.filter((category) => {
			  return category.name.toLowerCase().includes(`${selectedValue}`)
			});
					
		return (
			<Card
			  {...rest}
			  className={clsx(classes.root, className)}
			>
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
						  <TableCell>Ebay Id</TableCell>
						  <TableCell>Store Id</TableCell>
						  <TableCell>&nbsp; </TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>
					  					  
					  {(this.state.rowsPerPage > 0
						? filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: filteredCategories
						  ).map(category => (
						  <TableRow
							className={classes.tableRow}
							hover
							key={category._id}
							selected={selectedUsers.indexOf(category._id) !== -1}
						  >
							<TableCell padding="checkbox">
							  <Checkbox
								checked={selectedUsers.indexOf(category._id) !== -1}
								color="primary"
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
								<Typography variant="body1">{category.ebay_id}</Typography>
							</TableCell>
							
							<TableCell>
								<Typography variant="body1">{category.store_id}</Typography>
							</TableCell>
											   
							<TableCell>
							
							<Button onClick={() => this.props.editShape(category._id)} data-id={category._id} color="primary" variant="contained">
								<EditIcon />
							</Button>
							
							&nbsp;&nbsp;
													
							<Button onClick={this.handleDelete}  data-id={category._id} color="primary" variant="contained">
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
				  count={categories.length}
				  onChangePage={this.handlePageChange}
				  onChangeRowsPerPage={this.handleRowsPerPageChange}
				  page={page}
				  rowsPerPage={rowsPerPage}
				  rowsPerPageOptions={[5, 10, 25]}
				/>
			  </CardActions>
			</Card>	
		  );
	};
}

UsersTable.propTypes = {
  className: PropTypes.string
};

const useStyles = theme => ({
  root: {},
  content: {
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
  },
  button : {}
});

export default withStyles(useStyles)(UsersTable);
