export const updateUid = (uid) => {
  console.log("auth_action: ", uid)
  return {
    type: 'UPDATEUID',
    payload: { uid: uid }
  }
}