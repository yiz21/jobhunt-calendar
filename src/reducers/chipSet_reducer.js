const initialState = {
  chipSet: []
}

export const chipSetReducer = (state = initialState, action) => {
  let storeCopy = Object.assign({}, state);
  switch (action.type) {
    case 'FETCHCHARACHIPSETS':
      let index = 0
      action.payload.forEach(chipSet => {
        storeCopy[index] = chipSet
        index++;
      })
      return storeCopy
      
    case 'CLEARCHIPSETSTORE':
      return []
    default:
      return state
  }
}