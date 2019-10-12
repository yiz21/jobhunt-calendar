import React from 'react';
import Calendar from 'react-calendar';


export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservedData: [],
    }
  this.getTileContent = this.getTileContent.bind(this);
  }
  componentDidMount() {
    console.log("calendarView Mounted!!")
  }
  // propsで取得した予約情報(props.reserved)を本クラス用にフォーマットを変更する
  convertData = (data) => {
    let _convertedData = []
    console.log(data);
    if (data.length === 0) {
      return []
    }
    data.forEach((value, index) => {
      console.log("value > ", value)
      _convertedData[value.date.toDateString()] = value.station
    })
    console.log("convertedDate > ", _convertedData)
    return _convertedData
  }

  getTileContent = ({ date, view }) => {
    if(view!== 'month') {
      return null;
    }

    let _date = date.toDateString();
    console.log("date > ", _date)
    // console.log("reservedPlan[date] > ", reservedPlan[date])
    // console.log("(reservedPlan && reservedPlan[date]) > ", (reservedPlan && reservedPlan[_date]))
    return (
      <p>
        <br/>
        {
          (this.state.reservedData && this.state.reservedData[_date]) ? this.state.reservedData[_date] : ''
        }
      </p>
    )
  }

  render() {
    return (
      <div>
        <Calendar
          // onClickDay={onChange}
          // tileContent={getTileContent}
          tileContent={this.getTileContent}
        />
      </div>
    )
  }
}