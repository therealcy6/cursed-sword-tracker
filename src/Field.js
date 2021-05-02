import React from 'react'
import  'firebase/database'
import './Field.css';
import firebase from 'firebase/app'
import CountDownTimer from './CountdownTimer.js'

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {now: Date.now(), offset: 0};
        this.kill = this.kill.bind(this);
    }

    componentDidMount() {
        var offsetRef = firebase.database().ref(".info/serverTimeOffset");
        offsetRef.on("value", (snap) => {
            console.log(snap.val());
            this.setState({offset: snap.val(), now: Date.now() + snap.val()});
        });
        
        this.tick()
        this.setState({timer: setInterval(this.tick.bind(this), 100)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    
    tick() {
        this.setState({now: Date.now() + this.state.offset});
    }

    kill(index) {
        var update = {};
        update[index] = firebase.database.ServerValue.TIMESTAMP;
        firebase.update(`chronos`, update);
    }
      
    render() {
        return (
            <div className="field">
                <div className="zariche">
                    <div className="inner">
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="zarpriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="zarpriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="360" name="Zariche Chest" index="zarchest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="zarpriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="zarpriest4"></CountDownTimer>
                    </div>
                </div>
                <div className="akamanah">
                    <div className="inner">                    
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="akapriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="akapriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="360" name="Akamanah Chest" index="akachest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="akapriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Priest" index="akapriest4"></CountDownTimer>
                    </div>
                </div>
            </div>
        )
    }
}


export default Field;
