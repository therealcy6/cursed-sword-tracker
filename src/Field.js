import React from 'react'
import  'firebase/database'
import './Field.css';
import firebase from 'firebase/app'
import CountDownTimer from './CountdownTimer.js'

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {now: Date.now()}
        this.kill = this.kill.bind(this);
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
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Zariche Priest 1" index="zarpriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Zariche Priest 2" index="zarpriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="360" name="Zariche Chest" index="zarchest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Zariche Priest 3" index="zarpriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Zariche Priest 4" index="zarpriest4"></CountDownTimer>
                    </div>
                </div>
                <div className="akamanah">
                    <div className="inner">                    
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Akamanah Priest 1" index="akapriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Akamanah Priest 2" index="akapriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="360" name="Akamanah Chest" index="akachest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Akamanah Priest 3" index="akapriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} respawn="480" name="Akamanah Priest 4" index="akapriest4"></CountDownTimer>
                    </div>
                </div>
            </div>
        )
    }
}


export default Field;
