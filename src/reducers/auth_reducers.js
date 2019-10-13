const initialState = {
  uid: ''
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATEUID':
      const auth = Object.assign({}, state.auth);
      auth.uid = action.payload;
      return auth
    default:
      return state
  }
};
