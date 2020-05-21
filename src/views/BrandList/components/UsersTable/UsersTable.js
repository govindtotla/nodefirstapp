import React, { useState, Component } from 'react';
import clsx from 'clsx';
import Router from 'next/router'
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import Link from 'next/link';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 

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
			opendialog : false,
			selectedUsers : [],
			brands : []
      };
    }
    
    
    componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.brand);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.brands !== this.props.brands) {
			this.setState({ brands : this.props.brands });			
		}
	}

    componentDidMount(){
		this.props.fetchTable();
	};

    handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};  
  
	handleSelectAll = (event, brands) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = brands.map(brand => brand._id);
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
 	handleClose = () => {
		this.setState({ opendialog : false });
	  };
	opendialog = event => {
		this.setState({ opendialog : true });
	};
	handleDelete = event => {
		let id = event.currentTarget.dataset.id;
		fetch('/api/brands/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				brands: prevState.brands.filter(item => item._id !== id),
				opendialog : false,
			}));
		})
		.catch(error => console.log(error))
	};  
  
  render() {

		const { className, selectedValue, classes, ...rest } = this.props;
		const { brands, rowsPerPage, page, selectedUsers,opendialog,handleClose } = this.state;
				
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
							  checked={selectedUsers.length === brands.length}
							  color="primary"
							  indeterminate={
								selectedUsers.length > 0 &&
								selectedUsers.length < brands.length
							  }
							  onChange={event => this.handleSelectAll(event, brands)}
							/>
						  </TableCell>
						  <TableCell>Brand Name</TableCell>
						  <TableCell>Short Code</TableCell>
						  <TableCell>&nbsp; </TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>   
					  
					  	  {(this.state.rowsPerPage > 0
							? brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: brands
						  ).filter(brand => brand.brand_name.toLowerCase().includes(`${selectedValue}`) ).map(brand => (
						  <TableRow
							className={classes.tableRow}
							hover
							key={brand._id}
							selected={selectedUsers.indexOf(brand._id) !== -1}
						  >
							<TableCell padding="checkbox">
							  <Checkbox
								checked={selectedUsers.indexOf(brand._id) !== -1}
								color="primary"
								onChange={event => this.handleSelectOne(event, brand._id)}
								value="true"
							  />
							</TableCell>
							<TableCell>
							  <div className={classes.nameContainer}>
								<Typography variant="body1">{brand.brand_name}</Typography>
							  </div>
							</TableCell> 
							
							<TableCell>
								<Typography variant="body1">{brand.brand_short_code}</Typography>
							</TableCell>
											   
							<TableCell>
							
							<Button onClick={() => this.props.editForm(brand._id)} data-id={brand._id} color="primary" variant="contained">
								<EditIcon />
							</Button>
							
							&nbsp;&nbsp;
														
							<Button onClick={this.opendialog}  data-id={brand._id} color="primary" variant="contained">
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
								  <Button onClick={this.handleDelete} data-id={brand._id} color="primary" autoFocus>
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
				  count={brands.length}
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
