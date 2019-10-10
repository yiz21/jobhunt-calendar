import React from 'react'
import ResistButton from './resistrationButton'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.setPlanToStore = this.setPlanToStore.bind(this);
  }
  state = {
    uid: this.props.uid,
    date: "20000101",
    time: "10:00-20:00",
    station: "shinjuku"
  }

  setPlanToStore(sendDate, sendStation) {
    // redux操作
    const sendData = {
      uid: this.props.uid,
      date: sendDate,
      station: sendStation
    }
    this.props.resisterPlan(sendData);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>ログイン済みです uid: {this.props.uid}</p>
        <a href="#" onClick={this.props.signOut}> ログアウト</a>
        <ResistButton sendFunction={this.setPlanToStore}/>
      </div>
    )
  }
}

