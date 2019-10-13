import React from 'react';
import Calendar from 'react-calendar';
import './calendar.css'

export default class CalendarView extends React.Component {
  constructor(props) {
    console.log("CalendarView > Constructor > props", props)
    super(props);
    this.getTileContent = this.getTileContent.bind(this);
    // firebase上に登録されている情報とローカルストアを同期する
    props.fetchFunc(props.uid)
  }
  
  // ストアにkeyと同じ日付のデータがあればそのインデックスを返す。なければfalseを返す
  isExistPlan = (key) => {
    let displayedPlan = false
    this.props.reserved.forEach((planData, index) => {
      if (planData.date === key) {
        displayedPlan = planData
      }  
    })
    return displayedPlan
  }
  getTileContent = ({ date, view }) => {
    if(view!== 'month') {
      return null;
    }
    const year = String(date.getFullYear());
    const month = ("0"+ (date.getMonth() + 1)).slice(-2);
    const day = ("0"+ date.getDate()).slice(-2); // 1日進んでいる
    const key = year + month + day
    const displayedPlan = this.isExistPlan(key)
    console.log(displayedPlan)

    if(displayedPlan) {
      console.log(displayedPlan)
    }

    return (
      <p>
        <br/>
        { displayedPlan ? displayedPlan.companyName : ''}
      </p>
    )
  }

  render() {
    return (
      <div className="calendar-container">
        <Calendar
          onActiveDateChange={() => {console.log("hello")}}
          onChange={() => {console.log("hello")}}
          tileContent={this.getTileContent}
        />
      </div>
    )
  }
}