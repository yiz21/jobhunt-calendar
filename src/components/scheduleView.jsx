import React from 'react'
import ResistButton from './resistrationButton'
import CalendarView from './calendar'
import Header from './header'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.setPlanToStore = this.setPlanToStore.bind(this);
  }

  componentDidMount() {
    console.log("scheduleView is mounted!!")
  }

  componentDidUpdate() {
    console.log("scheduleView is updated!!")
  }

  setPlanToStore(sendDate, sendStation) {
    // redux操作
    const sendData = {
      reservedData: {
        uid: this.props.uid,
        date: sendDate,
        station: sendStation
      }
    }
    this.props.resisterPlan(sendData);
  }


  render() {
    console.log("ScheduleView > ", this.props.reservedPlan)
    return (
      <div>
        <Header onClick={this.props.signOut} />
        <CalendarView reserved={ this.props.reservedPlan.reserved }/>
        <ResistButton sendFunction={this.setPlanToStore}/>
      </div>
    )
  }
}

