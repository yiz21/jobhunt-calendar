const updateUid = (uid) => {
  console.log("auth_action: ", uid)
  return {
    type: 'UPDATEUID',
    payload: uid
  }
}

const addPlan = (info) => {
  return {
    type: 'ADDPLAN',
    payload: info
  }
}

const addPlans = (info) => {
  return {
    type: 'ADDPLANS',
    payload: info
  }
}

const clearPlanStore = () => {
  return {
    type: 'CLEARPLANSTORE'
  }
}

export { updateUid, addPlan, clearPlanStore, addPlans }