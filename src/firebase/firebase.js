import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAAbryZgdpH9qIArniUtimFJz_5-qf638k',
  authDomain: 'jobhunt-calendar.firebaseapp.com',
  projectId: 'jobhunt-calendar',
}

firebase.initializeApp(config)

export default firebase
