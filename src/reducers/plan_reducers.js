const initialState = {
  reserved: []
}

export const planReducer = (state = initialState, action) => {
  let storeCopyObj = Object.assign({}, state);
  switch (action.type) {
    case 'ADDPLANS': 
      // const plansByMonth = {
      //   '201909': [{
      //     companyName: '',
      //     date: ''
      //   }],
      //   '201908': [{
      //     companyName: '',
      //     date: ''
      //   }]
      // }

      action.payload.forEach(planDoc => {
        storeCopyObj[planDoc.date] = planDoc
      })
      return storeCopyObj
   case 'ADDPLAN':
      const key = new Date(action.payload.date)
      const convertKey = String(key.getFullYear()) + String(key.getMonth()+1) + String(key.getDate()) 
      storeCopyObj[convertKey] = action.payload
      return storeCopyObj

    case 'CLEARPLANSTORE':
      return {}
    default:
      return state
  }
};
