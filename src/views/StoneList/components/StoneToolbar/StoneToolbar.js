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
			href="/stones/add"
        >Add Stone</Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search stone"
        />
      </div>  
    </div>
  );
};

StoneToolbar.propTypes = {
  className: PropTypes.string
};

export default StoneToolbar;
