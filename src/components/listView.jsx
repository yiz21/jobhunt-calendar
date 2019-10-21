import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import AccessAlarmsSharp from '@material-ui/icons/AccessAlarmsSharp';
import TrainRounded from '@material-ui/icons/TrainRounded';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  MessageAboutNothingToShow: {
    textAlign: "center"
  }
}));

export default function ListView(props) {  
  const classes = useStyles();
  if((props.previewInfo.companyName === "" ) && (props.previewInfo.time === "") && (props.previewInfo.station === "")) {
    return (
      <div className={classes.MessageAboutNothingToShow}>
        <span>何も登録されていません</span>
      </div>
    )
  }

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="会社名" secondary={props.previewInfo.companyName} />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessAlarmsSharp/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="時間" secondary={props.previewInfo.time} />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TrainRounded/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="最寄駅" secondary={props.previewInfo.station} />
      </ListItem>
    </List>
  );
}
