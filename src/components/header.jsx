import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "#47a4e6",
		height: "auto",
		textAlign: "right",
		paddingRight: "20px",

	},
	link: {
		fontSize: "24px",
		color: "#f7f9fa"
	}
}));

export default function Header (props) {
	const classes = useStyles();
  return (
    <div className={classes.root}>
			<Link
			className={classes.link}
			component="button"
			variant="body2"
			color="inherit"
			onClick={props.onClick}
			>
			ログアウト
			</Link>
    </div>

  );
}
