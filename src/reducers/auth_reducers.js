const initialState = {
  uid: ''
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATEUID':
      console.log("authReducer > UPDATEUID > action.payload.uid", action.payload.uid);
      const auth = Object.assign({}, state.auth);
      auth.uid = action.payload.uid;
      return auth
    default:
      return state
  }
};
