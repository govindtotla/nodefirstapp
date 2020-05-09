import React, { useState, Component } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { StoneToolbar, StoneInput } from './components';

import { Button } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class StoneAdd extends Component {	
	constructor (props) {
      super();
    }
    
  render() {
		
		const { preData, classes, ...rest } = this.props;
		
		return ( 
			<div className={classes.root}>		  
				<div className={classes.row}>
					<span className={classes.spacer} />
				</div>
				
				<div className={classes.content}>
					<StoneInput preData={preData} />
				</div>
			</div>
		);
	}
}
export default withStyles(useStyles)(StoneAdd);
