import React from 'react'
import ResistButton from './resistrationButton'
import OutlinedButton from './outlineButton'
import Header from './header'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.setPlanToStore = this.setPlanToStore.bind(this);
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
        <Header/>
        <p>ログイン済みです uid: {this.props.uid}</p>
        <OutlinedButton onClick={this.props.signOut} label="ログアウト"/>
        <ResistButton sendFunction={this.setPlanToStore}/>
      </div>
    )
  }
}

