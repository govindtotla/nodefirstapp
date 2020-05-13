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

class ColorList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			open: false,
			color : {
				_id : "",
				color_name : "", 
				color_name_alias : ""
			}
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
				color: {
					_id : "",
					color_name : "", 
					color_name_alias : ""
				}
			});
	}
	
	editShape = shapeId => {
		fetch('/api/colors/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					color : result,
					open : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	onFormSubmit = dataObj => {
		let data = dataObj.color;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/colors', {
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
			Router.push('/colors');
		  },
		  (error) => {
			this.setState({ error });
		  }
		)
	  };
		
    
	render() {
		
		const { classes, ...rest } = this.props;
		const { selectedValue, color, open } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openHandler={this.openHandler} />
			  
			  <UsersInputbar open={open} color={color} openHandler={this.openHandler} onFormSubmit={this.onFormSubmit} />
			  
			  <div className={classes.content}>
				<UsersTable editShape={this.editShape} selectedValue={selectedValue} />
			  </div>
			</div>
		  );
	};
}

ColorList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(ColorList);
