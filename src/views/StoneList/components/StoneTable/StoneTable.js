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

class StoneTable extends Component {
	
	constructor (props) {
		super();
		this.state = this.getInitialState();
		this.state.stones	=	props.stones;
    }

	getInitialState = () => {
		const initialState = {			
			rowsPerPage : 10,
			page : 0,
			selectedUsers : []
      };
      return initialState;
    };

    handleChange = event => {
	// This triggers everytime the input is changed
		this.setState({
			...values,
			[event.target.name]: event.target.value,
		});
	};  
  
	handleSelectAll = (event, stones) => {
		let selectedUsers;
		if (event.target.checked) {
			selectedUsers = stones.map(stone => stone._id);
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
		
		//making a post request with the fetch API
		fetch('/api/stones/' + id, {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			} 
		})
		.then((res) => {
		  this.setState((prevState) => ({
				stones: prevState.stones.filter(item => item._id !== id),
			}));
		})
		.catch(error => console.log(error))
	};
	
	handleEdit = event => {	
		Router.push('/stones');		
	};
  
  
  render() {

		const { className, classes, ...rest } = this.props;
		const { stones, rowsPerPage, page, selectedUsers } = this.state;
				
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
							  checked={selectedUsers.length === stones.length}
							  color="primary"
							  indeterminate={
								selectedUsers.length > 0 &&
								selectedUsers.length < stones.length
							  }
							  onChange={event => this.handleSelectAll(event, stones)}
							/>
						  </TableCell>
						  <TableCell>Stone Name</TableCell>
						  <TableCell>Faux </TableCell>
						  <TableCell>Store Category ID</TableCell>
						  <TableCell>Stone Colors</TableCell>
						  <TableCell>&nbsp;</TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>              
						  {(this.state.rowsPerPage > 0
							? stones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: stones
						  ).map(stone => (
						  <TableRow
							className={classes.tableRow}
							hover
							key={stone._id}
							selected={selectedUsers.indexOf(stone._id) !== -1}
						  >
							<TableCell padding="checkbox">
							  <Checkbox
								checked={selectedUsers.indexOf(stone._id) !== -1}
								color="primary"
								onChange={event => this.handleSelectOne(event, stone._id)}
								value="true"
							  />
							</TableCell>
							<TableCell>
							  <div className={classes.nameContainer}>
								<Typography variant="body1">{stone.stone_name}</Typography>
							  </div>
							</TableCell> 
							
							<TableCell><Typography variant="body1">{stone.faux_id}</Typography></TableCell>
							<TableCell><Typography variant="body1">{stone.store_category_id}</Typography></TableCell>
							<TableCell><Typography variant="body1">{stone.color_id}</Typography></TableCell>
											   
							<TableCell>                    
							<Button href={'/stones/edit/' + stone._id} color="primary" variant="contained">
								<EditIcon />
							</Button>
							
							&nbsp;&nbsp;
							<Button onClick={this.handleDelete} data-id={stone._id} color="primary" variant="contained">
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
				  count={stones.length}
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

StoneTable.propTypes = {
  className: PropTypes.string,
  stones: PropTypes.array.isRequired
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

export default withStyles(useStyles)(StoneTable);
