import React from "react";
import './CountdownTimer.css';

import moment from 'moment';
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export default function CountDownTimer(props) {
  useFirebaseConnect([`chronos`])
  const chronos = useSelector((state) => state.firebase.data["chronos"])

  if (!isLoaded(chronos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(chronos)) {
    return <div>Observed Data Is Empty</div>
  }

  var lastDeath = moment(chronos[props.index]);
  var nextSpawn = lastDeath.add(props.respawn, "seconds");
  var spawnSecondsFromNow = Math.floor(nextSpawn.diff(moment())/1000);


  if (spawnSecondsFromNow > 0) {
    var now = moment(props.now);
    
    var swordsEnd = moment(now).utc().hour(2).minute(0).second(0).millisecond(0);
    var wontRespawnAfter = moment(swordsEnd).subtract(props.respawn, "second");
  
    console.log(wontRespawnAfter.format());
    
    var wontRespawn =now.isAfter(wontRespawnAfter) && now.isBefore(swordsEnd);
 
    return (
      <div className={`CountdownTimer ${spawnSecondsFromNow<=15?"soon":""} ${wontRespawn?"wontRespawn":""}`}>
        <span>
          <p><b>{props.name}</b></p>
          <button onClick={() => props.reset(props.index)}>Reset</button><br />{spawnSecondsFromNow}
        </span>
      </div>
    );
  }

  
  return (
    <div className={`CountdownTimer`}>
        <span>
          <p><b>{props.name}</b></p>
          <button onClick={() => props.kill(props.index)}>Kill</button>
        </span>
    </div>
  );
}