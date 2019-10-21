const updateUid = (uid) => {
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

const fetchCharacterChipSets = (chipSets) => {
  return {
    type: 'FETCHCHARACHIPSETS',
    payload: chipSets
  }
}

const addCharacterChipSet = (chipSet) => {
  return {
    type: 'ADDCHARACHIPSET',
    payload: chipSet
  }
}

const clearPlanStore = () => {
  return {
    type: 'CLEARPLANSTORE'
  }
}

const clearChipSetStore = () => {
  return {
    type: 'CLEARCHIPSETSTORE'
  }
}

export { updateUid, addPlan, clearPlanStore, addPlans, fetchCharacterChipSets, clearChipSetStore, addCharacterChipSet }