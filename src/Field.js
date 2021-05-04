import React from 'react'
import  'firebase/database'
import './Field.css';
import firebase from 'firebase/app'
import CountDownTimer from './CountdownTimer.js'
import moment from 'moment';

const chestRespawn = 360;
const priestRespawn = 480;

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {now: moment(), offset: 0};
        this.kill = this.kill.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        var offsetRef = firebase.database().ref(".info/serverTimeOffset");
        offsetRef.on("value", (snap) => {
            this.setState({offset: snap.val(), now: moment().add(snap.val(), "millisecond")});
        });
        
        this.tick()
        this.setState({timer: setInterval(this.tick.bind(this), 250)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    
    tick() {
        var now = moment().add(this.state.offset, "millisecond");
        //now.add(24, "hours").add(4, "hours").add(35, "minutes");
        this.setState({now: now});
    }

    kill(index) {
        var update = {};
        update[index] = firebase.database.ServerValue.TIMESTAMP;
        firebase.update(`chronos`, update);
    }

    reset(index) {
        var update = {};
        update[index] = 0;
        firebase.update(`chronos`, update);
    }
      
    render() {
        var active = true;

        moment.updateLocale('en', {
            relativeTime : {
                future: "%s",
                s  : '%d seconds',
                ss : '%d seconds',
                m:  "a minute",
                mm: "%d minutes",
            }
        });

        var now = moment(this.state.now);

        var swordsBegin = moment(now).utc().hour(1).minute(30).second(0).millisecond(0);
        var swordsBeginSoon = moment(now).utc().hour(1).minute(20).second(0).millisecond(0);
        var swordsEnd = moment(now).utc().hour(1).minute(59).second(0).millisecond(0);
        
        // Swords are active Tuesday - Friday 1:30am-2am UTC.
        if (now.utc().day() <= 1 || now.utc().day() >= 5 || !now.isBetween(swordsBegin, swordsEnd)) {
            active = false;
        } 

        return (
            <div className="field">
                {!active &&
                    <div className="inactive overlay">
                        {now.utc().day() >= 2 && now.utc().day() <= 5 && now.isAfter(swordsBeginSoon) && now.isBefore(swordsEnd) ? 'Swords begin soon in ' + now.to(swordsBegin) : 'Swords are currently inactive.' }
                    </div>
                }
                {active &&
                    <div className="active">
                        <div className={`active box ${Math.floor((swordsEnd.diff(now))/1000)<30?"soon":""}`}>
                            {now.to(swordsEnd)}
                        </div>
                    </div>
                }
                <div className="zariche">
                    <div className="inner">
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="zarpriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="zarpriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={chestRespawn} name="Zariche Chest" index="zarchest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="zarpriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="zarpriest4"></CountDownTimer>
                    </div>
                </div>
                <div className="akamanah">
                    <div className="inner">
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="akapriest1"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="akapriest2"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={chestRespawn} name="Akamanah Chest" index="akachest"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="akapriest3"></CountDownTimer>
                        <div></div>
                        <CountDownTimer now={this.state.now} kill={this.kill} reset={this.reset} respawn={priestRespawn} name="Priest" index="akapriest4"></CountDownTimer>
                    </div>
                </div>
            </div>
        )
    }
}


export default Field;
