import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
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
import ChipInputHelper from './chipInputHelper'


const useStyles = makeStyles(theme => ({
  root: {
    height: "40px",
    display: "flex",
    alignItems: 'flex-end',
    '& > span': {
      margin: theme.spacing(2),
    },
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chipInputHelper: {
    marginTop: '8px',
    paddingTop: '8px',
  }
}));

// 予定登録用のボタン　＝＞　上位コンポーネントからRedux操作用関数を受け取ってonClickで実行する
export default function ResistButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reserveData, setReserveData] = React.useState({
    date: new Date(props.activeDate),
    companyName: 'company',
    station: '新宿',
    companyCharacters: props.chipSet,
  })
  const [defaultCompanyCharacterChipSet, setDefaultCompanyCharacterChipSet] = React.useState(props.chipSet)

  // chipSetオブジェクトをlabelのみの配列形式に変換
  useEffect(() => {
    const chipLabelArray = []
    Object.keys(props.chipSet).map(key => {
      chipLabelArray.push(props.chipSet[key].label)
    })
    setDefaultCompanyCharacterChipSet(chipLabelArray); // 登録済みチップセットをStateに書き込む

    // デフォルトの送信データのcompanyCharactersも配列に変換しておく（チップセットを触らない状態で登録するとオブジェクトのままになってしまうため）
    setReserveData({
      date: new Date(props.activeDate),
      companyName: 'company',
      station: '新宿',
      companyCharacters: chipLabelArray,
    })
  }, []) // 空配列を引数に渡すことでマウント＆アンマウント時のみ実行する（本来は更新の依存値をセットする）



  const openDialog = () => {
    const copyObj = Object.assign({}, reserveData);
    copyObj.date = props.activeDate
    setReserveData(copyObj);
    setOpen(true);
  }
  
  const closeDialog = () => {
    setOpen(false);
  }

  const updateReserveDate = (_date) => {
    const copyObj = Object.assign({}, reserveData);
    copyObj.date = _date;
    setReserveData(copyObj);
  }

  const updateReserveStation =(e) => {
    const copyObj = Object.assign({}, reserveData);
    copyObj.station = e.target.value;
    setReserveData(copyObj);
  }

  const updateReserveCompanyName =(e) => {
    const copyObj = Object.assign({}, reserveData);
    copyObj.companyName = e.target.value;
    setReserveData(copyObj);
  }

  const updateReserveCompanyCharacters =(characters) => {
    const copyObj = Object.assign({}, reserveData);
    copyObj.companyCharacters = characters;
    setReserveData(copyObj);
  }

  const sendData = () => {
    props.sendFunction(reserveData);
    closeDialog();
  }

  return (
    <div className={classes.root}>
      <button className="addPlanBtn" onClick={openDialog}>
        <span >予定を登録する</span>
      </button>
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
              value={reserveData.date}
              onChange={updateReserveDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="時間"
              value={reserveData.date}
              onChange={updateReserveDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            id="name"
            label="会社名"
            type="string"
            fullWidth
            onChange={(value) => {updateReserveCompanyName(value)}}
          />
          <TextField
            margin="dense"
            id="name"
            label="最寄り駅"
            type="string"
            fullWidth
            onChange={(value) => {updateReserveStation(value)}}
          />
          <div className={classes.chipInputHelper}>
            <ChipInputHelper chipSet={defaultCompanyCharacterChipSet} onChange={updateReserveCompanyCharacters}/>
          </div>    
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
