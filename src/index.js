import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
// import createStore from './createStore'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor } from './createStore'

// ./createStore.jsにあるストア定義に沿ったデータストアを生成
// const store = createStore();

// ここでindex.htmlのid=rootにApp.jsをセット
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  
  document.getElementById('root')
); 