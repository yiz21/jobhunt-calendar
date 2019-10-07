import React from 'react'

export default class ScheduleView extends React.Component {
  // componentDidMount() {
  //   this.props.checkIsAuthenticated();
  // }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>ログイン済みです uid: {this.props.uid}</p>
        <a href="#" onClick={() => this.props.signOut()}> ログアウト</a>
      </div>

    )
  }
}

