import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { pxToVh, Theme } from '../theme';

const styles = {
	root: {
		background: Theme.boxColor,
		// boxShadow: `-5px -4px 18px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(255,255,255,0.1), 3px 5px 18px rgba(0,0,0,0.5)`,
		boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
		height: '100%',
		width: '100%',
		borderRadius: pxToVh(80),
	},
	
};

const CardDepth = (props) => {
	const { classes } = props;
	return (
		<Grid
		{...props}
			container
			className={classes.root}
			justify="center"
			alignItems="center">
			{props.children}
		</Grid>
	);
};

export default withStyles(styles)(CardDepth);
