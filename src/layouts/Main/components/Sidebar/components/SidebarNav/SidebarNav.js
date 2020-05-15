/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, ListItemIcon, ListItemText, Collapse, colors } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = makeStyles(theme => ({
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
}));

const CustomRouterLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>{children}</a>
  </Link>
);

const SidebarNav = props => {
  const { pages, vendor, className, ...rest } = props;
	
	const [open, setOpen] = React.useState(false);
    
	const handleClick = () => {
		setOpen(!open);
	};
  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map(page => (		
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            href={page.href}>
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>		  
        </ListItem>
      ))}
      
      
      
		  
      <ListItem button onClick={handleClick}>		
			<ListItemText primary="All Vendor Types" />
			{open ? <ExpandLess /> : <ExpandMore />}
		</ListItem>
		<Collapse in={open} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{vendor.map(itm => (
				<ListItem button href={itm.href} component={CustomRouterLink} className={classes.nested}>
					{itm.title}
				</ListItem>
				))}
			</List>
		</Collapse>
		
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
