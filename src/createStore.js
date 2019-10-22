// import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import { createStore as reduxCreateStore, combineReducers } from "redux";
// import logger from "redux-logger";
import { authReducer } from "./reducers/auth_reducers";
import { planReducer } from "./reducers/plan_reducers";
import { chipSetReducer } from "./reducers/chipSet_reducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth',"reservedPlan", "chipSet"]
}

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: authReducer,
    reservedPlan: planReducer,
    chipSet: chipSetReducer,
  }),
)

const store = reduxCreateStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(logger),
)

export const persistor = persistStore(store)
export default store
