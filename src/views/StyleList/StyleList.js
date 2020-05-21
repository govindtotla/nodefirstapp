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

class StyleList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			styles : [],
			open: false,
			style : {
				_id : "",
				style_name : "", 
				style_short_code : ""
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
				style: {
					_id : "",
					style_name : "", 
					style_short_code : ""
				}
			});
	}
	
	editForm = shapeId => {
		fetch('/api/styles/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					style : result,
					open : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	fetchTable = async () => {
		try {
			const response = await fetch('/api/styles')
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({ styles : json })
		}
		catch(error) {
			console.error(error)
		}
	}
	
	onFormSubmit = dataObj => {
		let data = dataObj.style;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/styles', {
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
			this.fetchTable();
		  },
		  (error) => {
			this.setState({ error });
		  }
		)
	  };
		
    
	render() {
		
		const { classes, ...rest } = this.props;
		const { selectedValue, styles, style, open } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openHandler={this.openHandler} />
			  
			  <UsersInputbar open={open} style={style} openHandler={this.openHandler} onFormSubmit={this.onFormSubmit} />
			  
			  <div className={classes.content}>
				<UsersTable styles={styles} fetchTable={this.fetchTable} editForm={this.editForm} selectedValue={selectedValue} />
			  </div>
			</div>
		  );
	};
}

StyleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(StyleList);
