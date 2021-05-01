import React from 'react'
import  'firebase/database'
import firebase from 'firebase/app'
import CountDownTimer from './CountdownTimer.js'
/*
export default function Field(props) { 
  return (
    <div>
        <CountDownTimer offset={props.offset} name="Akamanah Chest" index="akachest"></CountDownTimer>
        <CountDownTimer offset={props.offset} name="Akamanah Priest1" index="akapriest1"></CountDownTimer>
    </div>
  )
}
*/

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {now: Date.now()}   
    }

    componentDidMount() {
        var offsetRef = firebase.database().ref(".info/serverTimeOffset");
        offsetRef.on("value", (snap) => {
            this.setState({offset: snap.val(), now: Date.now() - snap.val()});
        });
        
        this.tick()
        this.setState({timer: setInterval(this.tick.bind(this), 1000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    
    tick() {
        this.setState({now: Date.now() - this.state.offset});
    }
      
    render() {
        return (
            <div>
                <CountDownTimer now={this.state.now} name="Akamanah Chest" index="akachest"></CountDownTimer>
                <CountDownTimer now={this.state.now} name="Akamanah Priest1" index="akapriest1"></CountDownTimer>
            </div>
        )
    }
}


export default Field;
