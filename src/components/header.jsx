import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	headerContainer: {
		backgroundColor: "#47a4e6",
		height: "auto",
		paddingRight: "20px",
		position: "fixed",
		width: "100%",
		padding: "10px 20px",
		boxSizing: "border-box",
		fontWeight: "bold",
		color: "#f7f9fa",
		fontSize: "24px",
	},
	titleContainer: {
		display: "inline-block",
		width: "40%"
	},
	title: {
		textAlign: "left",
		color: "#f7f9fa"
	},
	logoutButtonContainer: {
		display: "inline-block",
		textAlign: "right",
		width: "60%"
	},
	link: {
		display: "inline-block",
		textAlign: "right",
		paddingLeft: "10px",
	},

	
}));

export default function Header (props) {
	const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
			<div className={classes.titleContainer}>
				<span>
					就活スケジュール帳
				</span>
			</div>
			<div className={classes.logoutButtonContainer}>
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
    </div>
  );
}
