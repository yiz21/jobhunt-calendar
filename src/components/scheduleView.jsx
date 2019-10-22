import React from 'react'
import CalendarView from './calendar'
import Header from './header'
import './scheduleView.css'

export default class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.setPlanToStore = this.setPlanToStore.bind(this);
    this._fetchChipSet = this._fetchChipSet.bind(this);
    // ここでfirebase上に保存されている登録済み情報を取得する
    // props.fetchResisteredPlan(props.uid)
  }

  componentDidMount() {
    this.props.fetchResisteredPlan(this.props.uid)
    this.props.fetchChipSet(this.props.uid)
  }

  setPlanToStore(_reserveData) {
    // redux操作
    const copyObj = Object.assign({}, _reserveData);
    copyObj.uid = this.props.uid;

    this.props.resisterPlan(copyObj);
  }

  _fetchChipSet() {
    this.props.fetchChipSet(this.props.uid)
  }

  render() {
    return (
      <div>
        <Header onClick={this.props.signOut} />
        <CalendarView 
          setPlanToStore={this.setPlanToStore}
          reservedPlan={ this.props.reservedPlan }
          uid={this.props.uid}
          chipSet={this.props.chipSet}
          addChipSetFunc={this.props.addChipSetFunc}
        />
      </div>
    )
  }
}

