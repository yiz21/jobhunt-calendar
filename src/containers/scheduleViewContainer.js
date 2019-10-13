import { connect } from 'react-redux'
import * as actions from '../actions/action'
import firebase from '../firebase/firebase'
import scheduleView from '../components/scheduleView'

const mapStateToProps = state => {
  // console.log("mapStateToProps > state", state)
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
    reservedPlan: state.reservedPlan,
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
      const year = String(info.date.getFullYear());
      const month = ("0"+(info.date.getMonth() + 1)).slice(-2);
      const day = ("0"+info.date.getDay()).slice(-2);
      const key = `${month}${day}`
      // 既に登録済みの日時については上書きされる
      firebase.firestore().collection("plan").doc(info.uid)
        .collection(year).doc(key)
        .set({
          station: info.station,
          date: year + month + day,
          fulldate: info.date.toString(), // Sun Oct 13 2019 01:00:00 GMT+0900 (日本標準時)
          companyName: info.companyName
        })
        .then(() => {
          // ここで渡しているのはオブジェクト
          dispatch(actions.addPlan(info))
        })
    },
    fetchResisteredPlan: (uid) => {
      // firebase上に保存しているデータ構造
      // collection => "plan"   : 固定値
      // document   => (UID)　  ：ユーザーID
      // collection => (yyyy)   ：年
      // document   => (mmdd)　  ：月日
      dispatch(actions.clearPlanStore())
      const today = new Date()
      firebase.firestore().collection("plan").doc(uid).collection(String(today.getFullYear())).get()
        .then((plansQuery) => {
          const plans = []
          plansQuery.forEach(planDoc => plans.push(planDoc.data()))
          // ここで渡しているのは配列
          dispatch(actions.addPlans(plans))
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(scheduleView)
