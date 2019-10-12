import { connect } from 'react-redux'
import * as actions from '../actions/action'
import firebase from '../firebase/firebase'
import scheduleView from '../components/scheduleView'

const mapStateToProps = state => {
  console.log("mapStateToProps > state", state)
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
    reservedPlan: state.reservedPlan.reserved,
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
    },
    resisterPlan: ( info ) => {
      // 既に登録済みの日時については上書きされる
      firebase.firestore().collection(info.uid).doc(info.date.toString()).set({
        station: info.station,
      })
        .then(() => {
          dispatch(actions.addPlan(info))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(scheduleView)
