import React from "react";
import './CountdownTimer.css';

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

  var spawnTimestamp = chronos[props.index] + props.respawn * 1000;
  var spawnSecondsFromNow = Math.floor((spawnTimestamp - props.now)/1000);

  if (spawnSecondsFromNow > 0) {
    return (
      <div className="CountdownTimer">
        <span>
          {props.name} in {spawnSecondsFromNow}s
        </span>
      </div>
    );
  } 
  return (
    <div className="CountdownTimer">
        <span>
          <p>{props.name}</p>
          <button onClick={() => props.kill(props.index)}>Kill</button>
        </span>
    </div>
  );
}