import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { black } from 'ansi-colors';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: #
	}
}));

export default function Header () {
	const classes = useStyles();
  return (
    <div className={classes.root}>
			<Link
			component="button"
			variant="body2"
			onClick={() => {
				alert("I'm a button.");
			}}
			>
			Button Link
			</Link>
    </div>

  );
}
