import React from 'react';
import Calendar from 'react-calendar';
import ListView from './listView';
import ResistButton from './resistrationButton'
import './calendar.css'

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      date: new Date(),
      previewInfo:{
        companyName: "",
        time: "",
        station: ""
      }
    }
    this.getTileContent = this.getTileContent.bind(this);
    // firebase上に登録されている情報とローカルストアを同期する
    props.fetchFunc(props.uid)
  }
  
  // ストアにkeyと同じ日付のデータがあればそのオブジェクトを返す。なければfalseを返す
  isExistPlan = (date) => {
    const year = String(date.getFullYear());
    const month = ("0"+ (date.getMonth() + 1)).slice(-2);
    const day = ("0"+ date.getDate()).slice(-2); 
    const key = year + month + day

    let displayedPlan = false
    Object.keys(this.props.reservedPlan).forEach((index) => {
      // 存在していたらフラグにオブジェクトをセット
      if (this.props.reservedPlan[index].date === key) {
        displayedPlan = this.props.reservedPlan[index]
      }  
    })
    return displayedPlan
  }

  // 各カレンダー日付表示部に表示する内容を生成
  getTileContent = ({ date, view }) => {
    if(view!== 'month') {
      return 
    }

    const displayedPlan = this.isExistPlan(date)

    if(!displayedPlan) {
      return (
        <div className="date-null-container">
          <br/>
        </div>
      )
    }

    // カレンダーに表示する会社名は最大４文字とする
    displayedPlan.companyName = displayedPlan.companyName.slice(0, 4)
    return (
      <div className="date-container">
        <p>
          { displayedPlan ? displayedPlan.companyName : ''}
        </p>
      </div>
    )
  }

  updateListView = (value) => {
    // value => "Thu Oct 24 2019 00:00:00 GMT+0900 (日本標準時)"
    const previewInfo = this.isExistPlan(value)
    if (!previewInfo) {
      this.setState({
        date: value,
        previewInfo:
        {
          companyName: "",
          time: "",
          station: ""
        }
      })
      return
    }
    const convertedInfo = this.convertDataForListView(previewInfo)
    this.setState({
      date: new Date(),
      activeDate: value,
      previewInfo: convertedInfo
    })
    return 
  }

  convertDataForListView = (info) => {
    // 変換前
    // {
    //   "companyName": "a",
    //   "date": "20191002",
    //   "fulldate": "Tue Oct 01 2019 15:34:00 GMT+0900 (日本標準時)",
    //   "station": "qqq"
    // }
    // 変換後
    // {
    //   "companyName": "a",
    //   "date": "20191002",
    //   "fulldate": "Tue Oct 01 2019 15:34:00 GMT+0900 (日本標準時)",
    //   "time"": "15:34:00",
    //   "station": "qqq"
    // }
    const dateObj = new Date(info.fulldate)
    const hours = ("0" + dateObj.getHours()).slice(-2);
    const minutes = ("0" + dateObj.getMinutes()).slice(-2);

    info.time = hours + ':' + minutes + '~'
    return info
  }

  render() {
    return (
      <div className="calendar-view">
        <div className="calendar-container">
          <ResistButton activeDate={this.state.date} sendFunction={this.props.setPlanToStore}/>
          <Calendar
            locale="ja-JP"
            value={this.state.date}
            onClickDay={this.updateListView}
            tileContent={this.getTileContent}
          />
        </div>
        <div className="listview-container">
          <h2>予定詳細</h2>
          <ListView previewInfo={this.state.previewInfo}/>
        </div>
      </div>
    )
  }
}
