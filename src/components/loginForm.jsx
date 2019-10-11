import React from 'react'
import TopImage from '../top-image.jpg' 
import "./loginForm.css"
import OutlinedButton from './outlineButton'

export default class LoginForm extends React.Component {
  state = {
    uid: ''
  }

  componentDidMount() {
    this.props.checkIsAuthenticated();
  }
  
  render() {
    // Reduxのstoreの値を更新する流れ
    // containers => reducers => ./createStore.js
    return (
      <div className="root">
        <img src={TopImage} className="backgroundImage" alt="background"/>
        <OutlinedButton className="button" onClick={this.props.loginWithGoogle} label="Googleアカウントでログイン"/>
      </div>
    )
  }
}
