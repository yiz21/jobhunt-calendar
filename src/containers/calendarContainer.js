import { connect } from 'react-redux'
import CalendarView from '../components/calendar';

const mapStateToProps = state => {
  console.log("loginFormContainer > mapStateToProps", state)
  return {
    // LoginFormのprops.uid.uidにactionsのuidをマッピングする
    uid: state.auth.uid,
    reservedPlan: state.reservedPlan,
  }
}

// LoginForm コンポーネントに接続
export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)