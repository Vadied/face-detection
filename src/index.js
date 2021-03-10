import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { appReducer, boxesReducer } from './reducers.js';

const rootReducer = combineReducers({appReducer, boxesReducer})
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
    <Provider  store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
