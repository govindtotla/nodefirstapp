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
			selectedUsers : [],
			opendialog : false,
			styles : []
      };
    }
    
    
    componentDidUpdate(prevProps, prevState) {
		console.log(prevProps.vendor);
		//this.setState({ formData : prevProps.shape });
		if (prevProps.styles !== this.props.styles) {
			this.setState({ styles : this.props.styles });			
		}
	}

    componentDidMount(){
		this.props.fetchTable();
	};

    handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};  
  
	handleSelectAll = (event, styles) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = styles.map(style => style._id);
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
		fetch('/api/styles/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				styles: prevState.styles.filter(item => item._id !== id),
				opendialog : false,
			}));
		})
		.catch(error => console.log(error))
	};  
  
  render() {

		const { className, selectedValue, classes, ...rest } = this.props;
		const { styles, rowsPerPage, page, selectedUsers,opendialog,handleClose } = this.state;
				
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
							  checked={selectedUsers.length === styles.length}
							  color="primary"
							  indeterminate={
								selectedUsers.length > 0 &&
								selectedUsers.length < styles.length
							  }
							  onChange={event => this.handleSelectAll(event, styles)}
							/>
						  </TableCell>
						  <TableCell>Style Name</TableCell>
						  <TableCell>Short Code</TableCell>
						  <TableCell>&nbsp; </TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>   
					  
					  	  {(this.state.rowsPerPage > 0
							? styles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: styles
						  ).filter(style => style.style_name.toLowerCase().includes(`${selectedValue}`) ).map(style => (
						  <TableRow
							className={classes.tableRow}
							hover
							key={style._id}
							selected={selectedUsers.indexOf(style._id) !== -1}
						  >
							<TableCell padding="checkbox">
							  <Checkbox
								checked={selectedUsers.indexOf(style._id) !== -1}
								color="primary"
								onChange={event => this.handleSelectOne(event, style._id)}
								value="true"
							  />
							</TableCell>
							<TableCell>
							  <div className={classes.nameContainer}>
								<Typography variant="body1">{style.style_name}</Typography>
							  </div>
							</TableCell> 
							
							<TableCell>
								<Typography variant="body1">{style.style_short_code}</Typography>
							</TableCell>
											   
							<TableCell>
							
							<Button onClick={() => this.props.editForm(style._id)} data-id={style._id} color="primary" variant="contained">
								<EditIcon />
							</Button>
							
							&nbsp;&nbsp;
							
							<Button onClick={this.opendialog}  data-id={style._id} color="primary" variant="contained">
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
								  <Button onClick={this.handleDelete} data-id={style._id} color="primary" autoFocus>
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
				  count={styles.length}
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
