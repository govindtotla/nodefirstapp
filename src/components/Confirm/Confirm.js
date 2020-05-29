import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import {  
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

let resolve;

const defaultProps = {
  title: 'Confirmation',
  message: 'Are you sure?'
};


class Confirm extends Component {
	
	constructor (props) {
		super();
		this.state = { deleteDialog: false, showConfirmProps: {}, };
		this.handleCancel = this.handleCancel.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.show = this.show.bind(this);
	}
	
	
	static create(props = {}) {
		console.log('called'); 
		const containerElement = document.createElement('div');
		document.body.appendChild(containerElement);
		return render(<Confirm createConfirmProps={props} />, containerElement);
	}
	    

	handleCancel() {
		this.setState({ deleteDialog: false });
		Promise.resolve(false);
	}

	handleConfirm() {
		console.log('handleConfirm');
		this.setState({ deleteDialog: false });
		Promise.resolve(true);
	}
	
	componentDidMount(){
		console.log('Compnent loaded' + this.state.deleteDialog);
	};
	
	show(props = {}) {
		console.log('show called');
		//const showConfirmProps = { ...this.props.createConfirmProps, ...props };
		this.setState({ deleteDialog: true });
		this.handleConfirm();
		console.log('show called' + this.state.deleteDialog);
		return new Promise((res) => {
			resolve = res;
		});
	}

	render() {
		
		const { deleteDialog } = this.state;
	   return (
		 <div className={!deleteDialog ? 'modal' : 'modal is-active'}>
		   <button className="delete" aria-label="close" onClick={this.handleCancel} />  
		   <div>
			 <section>
			   <p>Are you sure?</p>
			 </section>
			 <footer className="modal-card-foot">
			   <button className="button is-danger" onClick={this.handleConfirm}>OK</button>
			   <button className="button" onClick={this.handleCancel}>Cancel</button>
			 </footer>
		   </div>
		 </div>
		 
	 
		/*const { deleteDialog } = this.state;
   
		return (
			<div>
			<p>Alert Dialog </p>
			<Dialog open={deleteDialog} onClose={this.handleCancel} 
				aria-labelledby="alert-dialog-title"  aria-describedby="alert-dialog-description" >
				<DialogTitle id="alert-dialog-title">{"DELETE?"}</DialogTitle>
				<DialogContent>
				  <DialogContentText id="alert-dialog-description">
				  Are you Sure you want to delete this item ?
				 </DialogContentText>
				</DialogContent>
				<DialogActions>
				  <Button onClick={this.handleCancel} color="primary"> Disagree </Button>
				  <Button onClick={this.handleConfirm} color="primary" autoFocus> Agree </Button>
				</DialogActions>
			</Dialog>
			</div>*/
		);
	}
}
export default Confirm;
