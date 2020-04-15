import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { SearchInput } from '@components';

import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  InputLabel,
  MenuItem,
  FormControl,
  Select
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
  }
}));

const StoneToolbar = props => {
	
  const { className, ...rest } = props;

  const classes = useStyles();
  
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
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
				  
				  <TextField
					fullWidth
					label="Stone Color"
					name="store_color_id"
					onChange={handleChange}
					style={{ marginTop: '1rem' }}
					type="text"
					variant="outlined"
				  />			  
				  
					<InputLabel shrink id="demo-simple-select-placeholder-label-label">
					  Faux Value
					</InputLabel>
					<Select
						name="faux_id"
					  labelId="demo-simple-select-placeholder-label-label"
					  id="demo-simple-select-placeholder-label"
					  value=""				  
					  displayEmpty
					  className={classes.selectEmpty}
					>
					  <MenuItem value=""><em>None</em></MenuItem>
					  <MenuItem value={10}>Ten</MenuItem>
					  <MenuItem value={20}>Twenty</MenuItem>
					  <MenuItem value={30}>Thirty</MenuItem>
					</Select>				
				  		 
				  
				  <TextField
					fullWidth
					label="Website Stone Alias"
					name="web_stone_id"
					onChange={handleChange}
					style={{ marginTop: '1rem' }}
					type="text"
					variant="outlined"
				  />
				  
				  <TextField
					fullWidth
					label="Stone Default Image"
					name="stone_image"
					onChange={handleChange}
					style={{ marginTop: '1rem' }}
					type="file"
					variant="outlined"
				  />
				  
				  <CardActions>
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
