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
			prices : []
      };
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.prices !== this.props.prices) {
			this.setState({ prices : this.props.prices });			
		}
	}

    componentDidMount(){
		this.props.fetchTable();
	};

    handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};  
  
	handleSelectAll = (event, prices) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = prices.map(price => price._id);
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
		fetch('/api/prices/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				prices: prevState.prices.filter(item => item._id !== id),
			}));
		})
		.catch(error => console.log(error))
	};  
  
  render() {

		const { className, selectedValue, classes, ...rest } = this.props;
		const { prices, rowsPerPage, page, selectedUsers } = this.state;
				
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
							  checked={selectedUsers.length === prices.length}
							  color="primary"
							  indeterminate={
								selectedUsers.length > 0 &&
								selectedUsers.length < prices.length
							  }
							  onChange={event => this.handleSelectAll(event, prices)}
							/>
						  </TableCell>
						  <TableCell>Lot Number</TableCell>
						  <TableCell>Lot Price</TableCell>
						  <TableCell>&nbsp; </TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>   
					  
					  	  {(this.state.rowsPerPage > 0
							? prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: prices
						  ).filter(price => price.lot_number.toLowerCase().includes(`${selectedValue}`) ).map(price => (
						  <TableRow
							className={classes.tableRow}
							hover
							key={price._id}
							selected={selectedUsers.indexOf(price._id) !== -1}
						  >
							<TableCell padding="checkbox">
							  <Checkbox
								checked={selectedUsers.indexOf(price._id) !== -1}
								color="primary"
								onChange={event => this.handleSelectOne(event, price._id)}
								value="true"
							  />
							</TableCell>
							<TableCell>
							  <div className={classes.nameContainer}>
								<Typography variant="body1">{price.lot_number}</Typography>
							  </div>
							</TableCell> 
							
							<TableCell>
								<Typography variant="body1">${price.lot_price}</Typography>
							</TableCell>
											   
							<TableCell>
							
							<Button onClick={() => this.props.editShape(price._id)} data-id={price._id} color="primary" variant="contained">
								<EditIcon />
							</Button>
							
							&nbsp;&nbsp;
							<Button onClick={this.handleDelete} data-id={price._id} color="primary" variant="contained">
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
				  count={prices.length}
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
