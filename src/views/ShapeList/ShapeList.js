import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { UsersToolbar, UsersTable } from './components';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class ShapeList extends Component {	
	constructor (props) {
      super();     
    }
    
     fetchShapes = () => {
		  //making a post request with the fetch API
		  fetch('/api/shapes', {
			method: 'GET'
			})
			.then((res) => {
			  this.setState({ shapes : res.json() });
			})
			.catch(error => console.log(error))
		};
		
    
	render() {
		
		const { classes, shapes, ...rest } = this.props;
		  return (
			<div className={classes.root}>
			  <UsersToolbar shapes={shapes} />
			  
			  <div className={classes.content}>
				<UsersTable shapes={shapes} />
			  </div>
			</div>
		  );
	};
}

ShapeList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(ShapeList);
