import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { SearchInput } from '@components';
import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';

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

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
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
  chip: {
    margin: 2,
  }
}));

const StoneToolbar = props => {

	const names = [
	  'Oliver Hansen',
	  'Van Henry',
	  'April Tucker',
	  'Ralph Hubbard',
	  'Omar Alexander',
	  'Carlos Abbott',
	  'Miriam Wagner',
	  'Bradley Wilkerson',
	  'Virginia Andrews',
	  'Kelly Snyder',
	  'Kelly 1',
	  'Kelly 2',
	  'Kelly 3',
	  'Kelly 4',
	  'Kelly 5',
	];	
  const { className, ...rest } = props;
  const classes = useStyles();  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const selectHandleChange = (event) => {
    setPersonName(event.target.value);
  };
  
  const [state, setState] = React.useState({
    right: false
  });
    
  const toggleDrawer = (anchor, open, data) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open, data });
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
			color="primary"
			variant="contained"
			onClick={toggleDrawer("add-stone", true)}
        >Add Stone</Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search stone"
        />
      </div>  
      
      <div className={classes.row}>
        <React.Fragment key="add-stone">
          <Drawer anchor="right" open={state["add-stone"]} onClose={toggleDrawer("add-stone", false)}>
            <Card
			  {...rest}
			  className={clsx(classes.root, className)}
			>
			  <CardContent className={classes.content}>
			
				<h2 id="form-dialog-title">Add Stone</h2>
				<form
					action='/stones'
					method='post'		
				  >
				  
				  <TextField
					fullWidth
					label="Stone Name"
					name="stone_name"
					onChange={handleChange}
					type="text"
					variant="outlined"
				  />
				  
				  <TextField
					fullWidth
					label="Store Category Id"
					name="store_category_id"
					onChange={handleChange}
					style={{ marginTop: '1rem' }}
					type="text"
					variant="outlined"
				  />
				  
				  <FormControl className={classes.formControl}>
					<InputLabel id="color_id-label">Select Color</InputLabel>
					<Select
					  labelId="color_id-label"
					  name="color_id"
					  multiple
					  style={{ marginTop: '1rem' }}
					  value={personName}
					  onChange={selectHandleChange}
					  input={<Input id="select-multiple-chip" />}
					  renderValue={(selected) => (
						<div className={classes.chips}>
						  {selected.map((value) => (
							<Chip key={value} label={value} className={classes.chip} />
						  ))}
						</div>
					  )}					  
					>
					  {names.map((name) => (
						<MenuItem key={name} value={name}>
						  {name}
						</MenuItem>
					  ))}
					</Select>
				  </FormControl>
				  
				  <TextField
					  id="outlined-select-faux"
					  select
					  fullWidth
					  name="faux_id"
					  label="Select Faux"
					  variant="outlined"
					  style={{ marginTop: '1rem' }}
					>
					  <MenuItem value=""><em>None</em></MenuItem>
					  <MenuItem value={10}>Ten</MenuItem>
					  <MenuItem value={20}>Twenty</MenuItem>
					  <MenuItem value={30}>Thirty</MenuItem>
					</TextField>					
					
					<TextField
					  id="outlined-select-web_stone"
					  select
					  fullWidth
					  name="web_stone_id"
					  label="Select Stone for Website"
					  helperText="Leave Blank if it is primary stone"
					  variant="outlined"
					  style={{ marginTop: '1rem' }}
					>
					  <MenuItem value=""><em>None</em></MenuItem>
					  <MenuItem value={10}>Ten</MenuItem>
					  <MenuItem value={20}>Twenty</MenuItem>
					  <MenuItem value={30}>Thirty</MenuItem>
					</TextField>
					
					<input
					  accept="image/*"
					  className={classes.input}
					  style={{ display: 'none' }}
					  id="raised-button-file"
					  name="stone_image"
					  type="file"
					/>
					<label htmlFor="raised-button-file">
					  <Button color="primary" variant="raised" component="span" className={classes.button}>
						Upload Stone Image
					  </Button>
					</label>	
					
				  <CardActions style={{ marginTop: '1rem' }}>
				  <Button onClick={toggleDrawer("add", false)} color="primary">
					Cancel
				  </Button>
				  
				  <Button
					color="primary"
					variant="outlined"
					type='submit'
					startIcon={<SaveIcon />}
				  >
					Save
				  </Button>
				  </CardActions>
				</form>
			</CardContent>
			</Card>
          </Drawer>
        </React.Fragment>
      </div>          
    </div>
  );
};

StoneToolbar.propTypes = {
  className: PropTypes.string
};

export default StoneToolbar;
