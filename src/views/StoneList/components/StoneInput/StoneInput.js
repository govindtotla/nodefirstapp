import React, { useState, Component }  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Router from 'next/router'
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { SearchInput } from '@components';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,  
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from '@material-ui/core';

const useStyles = theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300,
  },
  spacer: { flexGrow: 1 },
  valueInput: { margin: theme.spacing(1) },
  mrTop: { marginTop: theme.spacing(2) },
  chip: { margin: 2 },
  inner: { minWidth: 1050 },
});

class StoneInput extends Component {
		
	constructor (props) {
      super(props);
      this.state = {
		loading : true,
		erMsg : '',
		edit: false,      
		formData : {
			stone_name: '',
			store_category_id: '',
			color_id: [],
			faux_id: '',
			web_stone_id: ''
		}		  
      };
      this.state.colors		=	this.props.preData.colors;
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
		let eid = this.props.preData.eid;
		if (eid === 0) return;
		this.setState({
			edit: true,
			formData: {
					stone_name : this.props.preData.formData.stone_name,
					store_category_id : this.props.preData.formData.store_category_id,
					color_id : [this.props.preData.formData.color_id],
					faux_id : this.props.preData.formData.faux_id,
					web_stone_id : this.props.preData.formData.web_stone_id
				}
		});		
	  };

    selectHandleChange = event => {	
		const { formData } = { ...this.state };
		const currentformData = formData;
		currentformData.color_id = event.target.value;
		this.setState({
			formData: currentformData
		});
	};
	
	
    handleChange = event => {			
			const { formData } = { ...this.state };
			var objectSize = event.target.name;
			var newInput = Object.assign({},
				this.state.formData, {[objectSize]: event.target.value }
			);
			this.setState({ formData: newInput });
		};
	
	handleSubmit = evt => {
		evt.preventDefault();
		
		let eid = this.props.preData.eid;
	
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('stone_name', evt.target.stone_name.value);
		data.append('store_category_id', evt.target.store_category_id.value);
		data.append('faux_id', evt.target.faux_id.value);
		data.append('web_stone_id', evt.target.web_stone_id.value);
		data.append('color_id', this.state.formData.color_id);
		
		if (eid === 0)
		{
			axios.post('/api/stones', data)
				.then((res) =>  { 
					if (res.status === 200) 
					{
						this.setState({erMsg: res.message});
						Router.push('/stones');
					}	
				})
			.catch((err) => { this.setState({erMsg: err.response.data}); console.log(err.response.data); })
		}
		else
		{
			axios.put('/api/stones/' + eid, data)
			.then((res) =>  { 
				if (res.status === 200) 
				{
					this.setState({erMsg: res.message});
					Router.push('/stones');
				}	
			})
			.catch((err) => { this.setState({erMsg: err.response.data}); console.log(err.response.data); })
		}
	  };
	    
	render() {
				
		const { className, preData, classes, ...rest } = this.props;
				
		const faux			=	preData.faux;
		const web_stones	=	preData.web_stones; 
		const { loading, formData, colors } = this.state;

		const MenuProps = {
				PaperProps: {
					style: {
						maxHeight: 48 * 4.5 + 8,
						width: 250,
					},
				},
			};
		  
		  return (
			<div
			  {...rest}
			  className={clsx(classes.root, className)}
			>
			 
			  <div className={classes.content}>               
					<Card
					  {...rest}
					  className={clsx(classes.root, className)}
					>
					
					  <CardContent>	
					  <h2 id="form-dialog-title">
					  { this.state.edit ?  'Edit Stone': 'Add Stone' }
					  </h2>
					  
						{ this.state.erMsg &&
						<h3 className="error"> { this.state.erMsg } </h3> }
						
						<form
							action='/stones'
							method='post'
							onSubmit={this.handleSubmit}
						 >
						 
						  <TextField
							fullWidth
							label="Stone Name"
							name="stone_name"
							onChange={this.handleChange}
							type="text"
							className={classes.mrTop}
							value={formData.stone_name}
							variant="outlined"
							required
						  />
						  
						  <TextField
							fullWidth
							label="Store Category Id"
							name="store_category_id"
							onChange={this.handleChange}
							className={classes.mrTop}
							type="text"
							variant="outlined"							
							required
							value={formData.store_category_id}
						  />
						  
						   <TextField
							  id="outlined-select-faux"
							  select
							  fullWidth
							  name="faux_id"
							  label="Select Faux"
							  variant="outlined"
							  value={formData.faux_id}
							  className={classes.mrTop}
							  onChange={this.handleChange}
							>
							  {faux.map((fax) => (
								<MenuItem key={fax._id} value={fax._id}>{fax.faux_type}</MenuItem>
							  ))}
							</TextField>
						  
						  <FormControl className={classes.formControl}>
							<InputLabel id="color_id-label">Select Color</InputLabel>
							<Select
							  labelId="color_id-label"
							  name="color_id"
							  multiple
							  className={classes.mrTop}
							  value={formData.color_id}
							  onChange={this.selectHandleChange}
							  input={<Input id="select-multiple-chip" />}
							  MenuProps={MenuProps}
							  renderValue={(selected) => (
								<div className={classes.chips}>
								  {selected.map((value) => (
									<Chip key={value} label={colors[value]} className={classes.chip} />
								  ))}
								</div>
							  )}					  
							>
							{Object.keys(colors).map(id => (
								<MenuItem key={id} value={id}> {colors[id]} </MenuItem>
							  ))}							  
							</Select>
						  </FormControl>
						  
						 	<TextField
							  id="outlined-select-web_stone"
							  select
							  fullWidth
							  name="web_stone_id"
							  value={formData.web_stone_id}
							  label="Select Stone for Website"
							  helperText="Leave Blank if it is primary stone"
							  variant="outlined"
							  className={classes.mrTop}
							  onChange={this.handleChange}
							>
							{Object.keys(web_stones).map(id => (
								<MenuItem key={id} value={id}>
								  {web_stones[id]}
								</MenuItem>
							  ))}
							  
							</TextField>
							
							<input
							  accept="image/*"
							  className={classes.mrTop}
							  style={{ display: 'none' }}
							  id="raised-button-file"
							  name="stone_image"
							  ref={(ref) => { this.uploadInput = ref; }}
							  type="file"
							/>
							<label htmlFor="raised-button-file">
							  <Button color="primary" variant="outlined" component="span" className={classes.mrTop}>
								Upload Stone Image
							  </Button>
							</label>	
							
						  <CardActions style={{ marginTop: '1rem' }}>
						  
						  <Button
							color="primary"
							variant="contained"
							type='submit'
							startIcon={<SaveIcon />}
						  >
							Save
						  </Button>
						  
						  <Button href="/stones" color="primary">Cancel</Button>					  
						  
						  </CardActions>
						</form>
					</CardContent>
					</Card> 
				</div>
			</div>
		  );
		};
}

StoneInput.propTypes = {
  className: PropTypes.string
};
export default withStyles(useStyles)(StoneInput);
