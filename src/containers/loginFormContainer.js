import { connect } from 'react-redux'
import * as actions from '../actions/auth_action'
import firebase from '../firebase/firebase'
import LoginForm  from '../components/loginForm'

const mapStateToProps = state => {
  console.log("loginFormContainer > mapStateToProps", state)
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
  }
}

const mapDispatchToProps = dispatch => {
  console.log("loginFormContainer > mapDispatchToProps > dispatch",dispatch)
  return {
    // LoginFormのprops.loginWithGoogleにマッピングする
    loginWithGoogle: () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then ( (res) => {
          console.log("loginFormContainer > mapDispatchToProps > res",res)
          // ログインに成功した場合はユーザーIDをストアにセットする
          dispatch(actions.updateUid(res.user.uid))
        })
        .catch ((error) => {
          // エラーのときはストアは更新しない
          console.log('loginFormContainer > mapDispatchToProps > error: ', error.code)
        })
    },
    checkIsAuthenticated: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          // 未ログイン状態のときは何もしない
          return false
        } else {
          // ログイン済みであればユーザーIDをストアにセットする
          dispatch(actions.updateUid(user.uid))
          return true
        }
      })
    },
  }
}

// LoginForm コンポーネントに接続
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)