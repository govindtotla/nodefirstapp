import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
  IconButton,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  spacer: {
    flexGrow: 1
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
}));

const StoneTable = props => {
	const { className, stones, ...rest } = props;
	const classes = useStyles();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);
		
	const handleSelectAll = event => {
		const { stones } = props;

		let selectedUsers;

		if (event.target.checked) {
		  selectedUsers = stones.map(stone => stone.id);
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
                      checked={selectedUsers.length === stones.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < stones.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Stone Name</TableCell>
                  <TableCell>Faux</TableCell>
                  <TableCell>Store Category Id</TableCell>
                  <TableCell>Stone Color</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stones.slice(0, rowsPerPage).map(stone => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={stone.id}
                    selected={selectedUsers.indexOf(stone.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(stone.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, stone.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{stone.stone_name}</Typography>
                      </div>
                    </TableCell>
                    
                    <TableCell>{stone.faux}</TableCell>
                    <TableCell>{stone.store_category_id}</TableCell>
                    <TableCell>{stone.color}</TableCell>
                    
                    
                    <TableCell className={classes.actions}>
					  <Link href="#"><a><EditIcon color="primary" /></a></Link>
					  <Link href="#"><a><DeleteIcon color="primary" /></a></Link>
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

StoneTable.propTypes = {
  className: PropTypes.string,
  stones: PropTypes.array.isRequired
};

export default StoneTable;
