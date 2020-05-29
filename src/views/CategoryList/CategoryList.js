import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { UsersToolbar, UsersInputbar, UsersTable } from './components';
import Swal from 'sweetalert2';

class CategoryList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			open: false,
			categories : [],
			category : {
				_id : "",
				name:"",
				ebay_id : "", 
				store_id : ""
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
				category: {
					_id : "",
					name:"",
					ebay_id : "", 
					store_id : ""
				}
			});
	}
	
	fetchTable = async () => {
		try {
			const response = await fetch('/api/categories')
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({ categories : json })
		}
		catch(error) {
			console.error(error)
		}
	}
	
	editShape = shapeId => {
		fetch('/api/categories/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					category : result,
					open : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	onFormSubmit = dataObj => {
		let data = dataObj.category;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/categories', {
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
			Swal.fire('Added!','Category has been added successfully.','success');
		  },
		  (error) => {
			this.setState({ error });
		  }
		)
	  };
		
    
	render() {
		
		const { classes, ...rest } = this.props;
		const { selectedValue, categories, category, open } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openHandler={this.openHandler} />
			  
			  <UsersInputbar open={open} category={category} openHandler={this.openHandler} onFormSubmit={this.onFormSubmit} />
			  
			  <div className={classes.content}>
				<UsersTable categories={categories} fetchTable={this.fetchTable} editShape={this.editShape} selectedValue={selectedValue}  />
			  </div>
			</div>
		  );
	};
}

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired
};

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

export default withStyles(useStyles)(CategoryList);
