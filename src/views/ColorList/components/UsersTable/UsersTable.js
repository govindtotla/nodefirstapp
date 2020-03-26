import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
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

import { getInitials } from '@helpers';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
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
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
	const { className, users, ...rest } = props;
	const classes = useStyles();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const ITEM_HEIGHT = 48;
	
	const handleSelectAll = event => {
		const { users } = props;

		let selectedUsers;

		if (event.target.checked) {
		  selectedUsers = users.map(user => user.id);
		} else {
		  selectedUsers = [];
		}

		setSelectedUsers(selectedUsers);
	};
	
	const handleSelectOne = (event, id) => {
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

		setSelectedUsers(newSelectedUsers);
	};

	const handlePageChange = (event, page) => {
		setPage(page);
	};

	const handleRowsPerPageChange = event => {
		setRowsPerPage(event.target.value);
	};
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	
	
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
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Color Name</TableCell>
                  <TableCell>Color Alias Name</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{user.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.colorAlias}
                    </TableCell>
                    <TableCell>
                     <IconButton
						edge="end"
						size="small"
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={handleClick}
					  >
						<MoreVertIcon />
					  </IconButton>
					  <Menu
						id="long-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
						PaperProps={{
						  style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						  },
						}}
					  >
						  <MenuItem onClick={handleClose}>
						  <Link
							  color="primary"
							  href="/colors/edit/"
							  underline="always"
							  variant="h6">
							  
							  <a> Edit </a>
							  
							</Link>
						  </MenuItem>
						  
						  <MenuItem onClick={handleClose}>Delete</MenuItem>
						  
					  </Menu>
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
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
