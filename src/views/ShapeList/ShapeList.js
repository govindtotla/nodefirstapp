import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { UsersToolbar, UsersInputbar, UsersTable } from './components';

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
      this.state = {
			selectedValue: "",
			open: false,
			shape : {
				_id : "",
				shape_name : "", 
				if_ebay : ""
			},
			if_ebay_val : [
				{value: '1', label: 'Yes'},
				{value: '0', label: 'No' }
			  ]
		}
    }
    
    selectedValueHandler = (selectedValue) => {
		this.setState({
			selectedValue
		})
	}
	
    openHandler = (open) => {
		this.setState({
			open
		});
		this.setState({
					shape: {
						_id : "",
						shape_name : "", 
						if_ebay : ""
					}
			});
	}
	
	editShape = shapeId => {
		fetch('/api/shapes/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					shape: result,
					open : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	onFormSubmit = dataObj => {
		let data = dataObj.shape;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/shapes', {
			method: methd,
			headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				}, 
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(result => {
			this.setState({
			  open: false
			});
			Router.push('/shapes');
		  },
		  (error) => {
			this.setState({ error });
		  }
		)
	  };
		
    
	render() {
		
		const { classes, ...rest } = this.props;
		const { selectedValue, shape, open } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openHandler={this.openHandler} />
			  
			  <UsersInputbar open={open} shape={shape} openHandler={this.openHandler} if_ebay_val={this.state.if_ebay_val} onFormSubmit={this.onFormSubmit} />
			  
			  <div className={classes.content}>
				<UsersTable editShape={this.editShape} selectedValue={selectedValue} />
			  </div>
			</div>
		  );
	};
}

ShapeList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(ShapeList);
