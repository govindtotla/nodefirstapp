/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState, Component } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Button, ListItemIcon, ListItemText, Collapse, colors } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
   nested: {
    paddingLeft: theme.spacing(4),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
});



class SidebarNav extends Component {	
	constructor (props) {
      super();
      this.state = {}
    }
    
    
    handleClick( item ) {
		this.setState( prevState => ( 
		  { [ item ]: !prevState[ item ] } 
		) )
	  }
	 
	 handler( children ) {
		const { classes } = this.props
		const { state } = this
		
		return children.map( ( subOption ) => {
			  if ( !subOption.children ) {
				return (
				  <ListItem className={classes.item} disableGutters key={subOption.title}>
					  <Button
						activeClassName={classes.active}
						className={classes.button}						
						href={subOption.href}>
						<div className={classes.icon}>{subOption.icon}</div>
						{subOption.title}
					  </Button>					 
					</ListItem>
				)
			  }
			  return (
				<div key={ subOption.title }>
				  <ListItem 
					button
					className={classes.item} disableGutters key={subOption.title}
					onClick={ () => this.handleClick( subOption.title ) }>
					<div className={classes.icon}>{subOption.icon}</div>
					<ListItemText 
						className={classes.button}
						  primary={ subOption.title } />
							{ state[ subOption.title ] ? 
							  <ExpandLess /> :
							  <ExpandMore />
							}
				  </ListItem>
				  
				  <Collapse 
					in={ state[ subOption.title ] } 
					timeout="auto" 
					unmountOnExit
				  >
					{ this.handler( subOption.children ) }
				  </Collapse>
				</div>
			  )
			} )
	  }
	  
    render() {		
		const { pages, classes, className, ...rest } = this.props;
		const { state } = this;
			
		const CustomRouterLink = ({ className, href, hrefAs, children, prefetch }) => (
				  <Link href={href} as={hrefAs}>
					<a className={className}>{children}</a>
				  </Link>
				);
		 
		 return (
			<div>
				<List {...rest} className={clsx(classes.root, className)}>				 
				  { this.handler( pages ) }
				</List>
				
			</div>
		  );
	};
}

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default withStyles(useStyles)(SidebarNav);
