import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core';

class UsersImportbar extends Component {
		
	constructor (props) {
		super(props);
		this.state = {
			erMsg : "",
			openImport : false
		};		
	}
	
	handleChange = event => { };
	
	
	handleSubmit = evt => {
		evt.preventDefault();
		
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		
		axios.post('/api/import_prices', data)
			.then((res) =>  { 
				if (res.status === 200) 
				{
					this.setState({erMsg: res.message});
					this.props.fetchTable();
					this.toggleDrawer(false);
				}	
			})
		.catch((err) => { this.setState({erMsg: err.response.data}); console.log(err.response.data); })	
	  };
    
    toggleDrawer = (event) => {
		if(typeof this.props.openImportHandler !== 'undefined'){
			this.props.openImportHandler(false);
		}
	}
	  	
	render() {
		const { classes, openImport, className, ...rest } = this.props;
		
		let pageTitle = <h2 id="form-dialog-title">Import Lot Price</h2>;
		let btnTxt = 'Import';
		
		return (
			<React.Fragment key="add-color">
			  <Drawer anchor="right" open={openImport} onClose={this.toggleDrawer}>
				<Card
				  {...rest}
				  className={clsx(classes.root, className)}
				>
				  <CardContent className={classes.content}>
				
					{pageTitle}
					
					{ this.state.erMsg &&
						<h3 className="error"> { this.state.erMsg } </h3> }
						
					
					<form onSubmit={this.handleSubmit} >					  
					  <input
						  accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
						  className={classes.mrTop}
						  style={{ display: 'none' }}
						  id="raised-button-file"
						  name="import_file"
						  ref={(ref) => { this.uploadInput = ref; }}
						  type="file"
						/>
						<label htmlFor="raised-button-file">
						  <Button color="primary" variant="outlined" component="span" className={classes.mrTop}>
							Upload Lot Price Excel
						  </Button>
						</label>

					  <CardActions>
						  <Button
							color="primary"
							variant="contained"
							type='submit'
							startIcon={<SaveIcon />}
						  >
							{btnTxt}
						  </Button>							  
						  <Button
							color="secondary"
							variant="contained"
							onClick={this.toggleDrawer}
						  >
							Cancel
						  </Button>
					  </CardActions>
					</form>
				</CardContent>
				</Card>
			  </Drawer>
			</React.Fragment>
			);
		};
}

UsersImportbar.propTypes = {
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
	  importButton: { marginRight: theme.spacing(1) },
	  searchInput: { marginRight: theme.spacing(1) }
	});	
export default withStyles(useStyles)(UsersImportbar);
