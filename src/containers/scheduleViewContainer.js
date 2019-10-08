import { connect } from 'react-redux'
import * as actions from '../actions/auth_action'
import firebase from '../firebase/firebase'
import scheduleView from '../components/scheduleView'

const mapStateToProps = state => {
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    signOut: () => {
      firebase.auth().signOut()
        .then( () => {
          dispatch(actions.updateUid(''))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(scheduleView)
