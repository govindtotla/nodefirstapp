import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { SearchInput } from '@components';
import { Button } from '@material-ui/core';

class UsersToolbar extends Component {
		
	constructor (props) {
		super(props);
	}
	
	SearchShape = (event) => {
		if(typeof this.props.selectedValueHandler !== 'undefined'){
			this.props.selectedValueHandler(event.target.value.toLowerCase());
		}
	}
	
	toggleDrawer = (event) => {
		if(typeof this.props.openHandler !== 'undefined'){
			this.props.openHandler(true);
		}
	}
			  	
	render() {
		const { classes, className, ...rest } = this.props;
	
		return (
			<div		 
			  className={clsx(classes.root, className)}
			>
			  <div className={classes.row}>
				<span className={classes.spacer} />
				<Button
					color="primary"
					variant="contained"
					onClick={this.toggleDrawer}
				>Add Style</Button>
			  </div>
			  <div className={classes.row}>
				<SearchInput
				  className={classes.searchInput}
				  placeholder="Search Style"
				  onChange={this.SearchShape}
				/>
			  </div>			           
			</div>
			);
		};
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const useStyles = theme => ({
	  root: {},
	  row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	  },
	  content: {marginTop: theme.spacing(2)},
	  spacer: { flexGrow: 1 },
	  searchInput: { marginRight: theme.spacing(1) }
	});	
export default withStyles(useStyles)(UsersToolbar);
