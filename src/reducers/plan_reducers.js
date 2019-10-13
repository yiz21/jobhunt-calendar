const initialState = {
  reserved: []
}

export const planReducer = (state = initialState, action) => {
  // console.log("planReducer > state", state)
  let storeCopyObj = Object.assign({}, state);
  console.log("state >", state)
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
      // const plansByYearMonths = plans.reduce((prev, current) => {
      //   const date = new Date(current.date)
      //   const year = date.getFullYear();
      //   const month = ("0"+(date.getMonth() + 1)).slice(-2);
      //   const key = `${year}${month}`
      //   const plansByYearMonth = prev[key] || []
      //   plansByYearMonth.push(current)
      //   return prev
      // }, {})  
      // console.log("plans >  ", plansByYearMonths)
      console.log(action.payload)
      action.payload.forEach(planDoc => {
        storeCopyObj[planDoc.date] = planDoc
      })
      return storeCopyObj
   case 'ADDPLAN':
      // storeCopyArray.push(action.payload)
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
