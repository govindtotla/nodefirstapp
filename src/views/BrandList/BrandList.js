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

class BrandList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			brands : [],
			open: false,
			brand : {
				_id : "",
				brand_name : "", 
				brand_short_code : ""
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
				brand: {
					_id : "",
					brand_name : "", 
					brand_short_code : ""
				}
			});
	}
	
	editForm = shapeId => {
		fetch('/api/brands/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					brand : result,
					open : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	fetchTable = async () => {
		try {
			const response = await fetch('/api/brands')
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({ brands : json })
		}
		catch(error) {
			console.error(error)
		}
	}
	
	onFormSubmit = dataObj => {
		let data = dataObj.brand;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/brands', {
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
		const { selectedValue, brands, brand, open } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openHandler={this.openHandler} />
			  
			  <UsersInputbar open={open} brand={brand} openHandler={this.openHandler} onFormSubmit={this.onFormSubmit} />
			  
			  <div className={classes.content}>
				<UsersTable brands={brands} fetchTable={this.fetchTable} editForm={this.editForm} selectedValue={selectedValue} />
			  </div>
			</div>
		  );
	};
}

BrandList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(BrandList);
