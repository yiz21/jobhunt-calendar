import { connect } from 'react-redux'
import * as actions from '../actions/action'
import firebase from '../firebase/firebase'
import scheduleView from '../components/scheduleView'

const mapStateToProps = state => {
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
    reservedPlan: state.reservedPlan,
    chipSet: state.chipSet,
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
      const day = ("0"+info.date.getDate()).slice(-2);
      const key = `${month}${day}`
      // 既に登録済みの日時については上書きされる
      firebase.firestore().collection("plan").doc(info.uid)
        .collection(year).doc(key)
        .set({
          station: info.station,
          date: year + month + day,
          fulldate: info.date.toString(), // Sun Oct 13 2019 01:00:00 GMT+0900 (日本標準時)
          companyName: info.companyName,
          companyCharacters: info.companyCharacters,
        })
        .then(() => {
          // ここで渡しているのはオブジェクト
          dispatch(actions.addPlan(info))
        })
      
      // 今回登録されたキーワード全てについて、登録されていないキーワードがあればfirebase上に登録する
      info.companyCharacters.forEach(characterKeyword => {
        let isExist = false // firebase上に登録済みか否かのフラグ
        firebase.firestore().collection('chipset').doc(info.uid).collection('company-character').get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(characterKeyword === doc.data().label){
                isExist = true
              }
            })
          })
          .then(() => {
            // firebase上に登録されていなかったらキーワードとして新しく登録する
            if(!isExist) {
              firebase.firestore().collection('chipset').doc(info.uid).collection('company-character').doc().set({
                label: characterKeyword
              })
            }
          })
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

    },
    fetchChipSet: (uid) => {
      // 最初にストアにあるチップセットのリストを空にする
      dispatch(actions.clearChipSetStore())

      // firebaseから会社の特徴に登録済みのチップセットリストを取得
      firebase.firestore().collection("chipset").doc(uid).collection("company-character").get()
        .then((characterQuery) => {
          const characterChipSets = []
          characterQuery.forEach(characterDoc => characterChipSets.push({
            id: characterDoc.id,
            label: characterDoc.data().label
          }))
          dispatch(actions.fetchCharacterChipSets(characterChipSets))
      })
    },
    addChipSet: (uid, _label) => {
      firebase.firestore.collection("chipset").doc(uid).collection("company-character").doc().set({
        label: _label
      })
        .then(() => {
          this.fetchChipSet(uid);
        })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(scheduleView)
