const updateUid = (uid) => {
  console.log("auth_action: ", uid)
  return {
    type: 'UPDATEUID',
    payload: { uid: uid }
  }
}

const addPlan = (info) => {
  return {
    type: 'ADDPLAN',
    payload: { plan: info }
  }
}

export { updateUid, addPlan }