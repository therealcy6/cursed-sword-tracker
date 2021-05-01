import './App.css';
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
  constructor(props) {
    super(props);
    this.state = {offset: 0};    
  }

  componentDidMount() {
    var offsetRef = firebase.database().ref(".info/serverTimeOffset");
    offsetRef.on("value", (snap) => {
      this.setState({offset: snap.val()});
    });
  } 

  render() {
    const offset = this.state.offset;
    return (
      <div className="App">
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Field offset={offset}></Field>
          </ReactReduxFirebaseProvider>
        </Provider>
      </div>
    );
  }
}
export default App;