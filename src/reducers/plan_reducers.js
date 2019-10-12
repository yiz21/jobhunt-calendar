const initialState = {
  reserved: []
}

export const planReducer = (state = initialState, action) => {
  // console.log("planReducer > state", state)
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
      return action.payload
   case 'ADDPLAN':
      storeCopyObj[action.payload.date] = action.payload
      return storeCopyObj

    case 'CLEARPLANSTORE':
      return {}
    default:
      return state
  }
};
