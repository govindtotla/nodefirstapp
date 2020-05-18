import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { StoneToolbar, StoneTable } from './components';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class StoneList extends Component {	
	constructor (props) {
      super();
      this.state = {
			selectedValue: "",
			stones : [],
		}
    }
    
    selectedValueHandler = (selectedValue) => {
		this.setState({
			selectedValue
		})
	}
	
	fetchTable = async () => {
		try {
			const response = await fetch('/api/stones')
			const json = await response.json()
			if(!response.ok) {
				throw { status: response.status, fullError: json } 
			}
			this.setState({ stones : json })
		}
		catch(error) {
			console.error(error)
		}
	}	
    
	render() {
		
		const { classes, ...rest } = this.props;
		const { selectedValue, stones } = this.state;
		
		const faux_list  = this.props.preData.faux_list;
		const color_list  = this.props.preData.color_list;
			
		  return (
			<div className={classes.root}>		  
				<StoneToolbar selectedValueHandler={this.selectedValueHandler} />
				
				<div className={classes.content}>
					<StoneTable stones={stones} faux_list={faux_list} color_list={color_list} fetchTable={this.fetchTable} selectedValue={selectedValue} />
				</div>
			</div>
		  );
	};
}

StoneList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(StoneList);
