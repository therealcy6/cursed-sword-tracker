import './App.css';
import firebaselogo from './firebase.svg';
import reduxlogo from './Redux.png';
import reactlogo from './react.png';
import Field from './Field.js';
import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAdfLtZMmiJBTY3BQ9WxftesK-wGxX-Ego",
  authDomain: "cursed-sword-tracker.firebaseapp.com",
  databaseURL: "https://cursed-sword-tracker-default-rtdb.firebaseio.com",
  projectId: "cursed-sword-tracker",
  storageBucket: "cursed-sword-tracker.appspot.com",
  messagingSenderId: "769622462914",
  appId: "1:769622462914:web:bce846260b796e092d065b",
  measurementId: "G-2S7XN25YDS"
};

const rrfConfig = {
  userProfile: 'users'
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="appTitle">
          <h1>Cursed Sword Tracker</h1>
        </div>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Field></Field>
          </ReactReduxFirebaseProvider>
        </Provider>
        <div className="appFooter">
          <h3>Made by AlphaSix</h3>
          <img src={reactlogo} className="appLogo" alt="logo" />
          <img src={reduxlogo} className="appLogo" alt="logo" />
          <img src={firebaselogo} className="appLogo" alt="logo" />
        </div>
      </div>
    );
  }
}
export default App;