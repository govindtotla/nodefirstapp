import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { UsersToolbar, UsersInputbar, UsersImportbar, UsersTable } from './components';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class PriceList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			openPrice: false,
			openImport: false,
			prices : [],
			price : {
				_id : "",
				lot_number : "", 
				lot_price : ""
			}
		}
    }
    
    selectedValueHandler = (selectedValue) => {
		this.setState({
			selectedValue
		})
	}
	
    openPriceHandler = (openPrice) => {
		this.setState({
			openPrice
		});
		this.setState({
				price: {
					_id : "",
					lot_number : "", 
					lot_price : ""
				}
			});
	}
	
    openImportHandler = (openImport) => {
		console.log('here classed');
		this.setState({
			openImport
		});
	}
	
	fetchTable = async () => {
		try {
			const response = await fetch('/api/prices')
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({ prices : json })
		}
		catch(error) {
			console.error(error)
		}
	}
	
	editShape = shapeId => {
		fetch('/api/prices/' + shapeId)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					price : result,
					openPrice : true
				});
			})
			.catch((error) => { console.log(error) } );
	};
	
	onFormSubmit = dataObj => {
		let data = dataObj.price;
		let methd = 'POST';
		if(data._id != ''){
		  methd = 'PUT'
		}
		fetch('/api/prices', {
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
			  openPrice: false
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
		const { selectedValue, prices, price, openPrice, openImport } = this.state;
			
		  return (
			<div className={classes.root}>
			  <UsersToolbar selectedValueHandler={this.selectedValueHandler} openImportHandler={this.openImportHandler} openPriceHandler={this.openPriceHandler} />
			  
			  <UsersInputbar openPrice={openPrice} openPriceHandler={this.openPriceHandler} price={price} onFormSubmit={this.onFormSubmit} />
			  
			  <UsersImportbar openImport={openImport} openImportHandler={this.openImportHandler} fetchTable={this.fetchTable} />
			  
			  <div className={classes.content}>
				<UsersTable prices={prices} fetchTable={this.fetchTable} editShape={this.editShape} selectedValue={selectedValue} />
			  </div>
			</div>
		  );
	};
}

PriceList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(PriceList);
