const initialState = {
  reserved: []
}

export const planReducer = (state = initialState, action) => {
  console.log("planReducer > ", state)
  switch (action.type) {
    case 'ADDPLAN':
      const obj = {
        reserved: []
      }
      let storeCopyObj = Object.assign({}, state);
      console.log("planReducer > storeCopyObj", storeCopyObj)

      // obj.reserved = state.reserved.slice(0, state.reserved.length)
      let isSameTimeInfoExists = false
      storeCopyObj.reserved.forEach((value, index) => {
        // 既に同じ時刻で予定が登録されていたら情報を上書きする
        if(value.date === action.payload.plan.date) {
          storeCopyObj.reserved[index].station = action.payload.plan.station
          isSameTimeInfoExists = true
          console.log("既に同じ時刻にデータが存在していました")
        }
      })
      if(!isSameTimeInfoExists) {
        console.log("同じ時刻にデータは存在しませんでした")
        storeCopyObj.reserved.unshift({
          "date": action.payload.plan.date,
          "station": action.payload.plan.station
        })
      }
      return storeCopyObj
    default:
      return state
  }
};
