import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
}));

// 予定登録用のボタン　＝＞　上位コンポーネントからRedux操作用関数を受け取ってonClickで実行する
export default function ResistButton(props) {
  const [open, setOpen] = React.useState(false);
  const [reserveDate, setReserveDate] = React.useState(new Date('2019-10-07T01:00:00'));
  const [reserveStation, setReserveStation] = React.useState('');
  const classes = useStyles();

  const openDialog = () => {
    setOpen(true);
  }
  
  const closeDialog = () => {
    setOpen(false);
  }

  const updateReserveDate = (date) => {
    setReserveDate(date)
  }

  const updateReserveStation =(e) => {
    setReserveStation(e.target.value)
  }
  

  const sendData = () => {
    props.sendFunction(reserveDate, reserveStation);
    closeDialog();
  }

  return (
    <div className={classes.root}>
      {/* ダイアログを開くためのアイコン */}
      <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }} onClick={openDialog}>
        add_circle
      </Icon>
      {/* 登録する情報を入力するためのダイアログ */}
      <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">予定の登録</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="日付"
              format="yyyy/MM/dd"
              value={reserveDate}
              onChange={updateReserveDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="時間"
              value={reserveDate}
              onChange={updateReserveDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            id="name"
            label="最寄り駅"
            type="string"
            fullWidth
            onChange={(value) => {updateReserveStation(value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            閉じる
          </Button>
          <Button onClick={sendData} color="primary">
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}