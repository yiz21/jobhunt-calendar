import React from 'react'
import CalendarView from './calendar'
import Header from './header'
import './scheduleView.css'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.setPlanToStore = this.setPlanToStore.bind(this);

    // ここでfirebase上に保存されている登録済み情報を取得する
    // props.fetchResisteredPlan(props.uid)
  }

  setPlanToStore(_reserveData) {
    // redux操作
    const copyObj = Object.assign({}, _reserveData);
    copyObj.uid = this.props.uid;

    this.props.resisterPlan(copyObj);
  }

  render() {
    return (
      <div>
        <Header onClick={this.props.signOut} />
        <CalendarView setPlanToStore={this.setPlanToStore} reservedPlan={ this.props.reservedPlan } fetchFunc={this.props.fetchResisteredPlan} uid={this.props.uid}/>
      </div>
    )
  }
}

