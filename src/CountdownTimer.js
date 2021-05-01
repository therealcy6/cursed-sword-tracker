import React from "react";

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

  var spawnTimestamp = chronos[props.index];
  var spawnSecondsFromNow = Math.floor((spawnTimestamp - props.now)/1000);

  return (
    <div>
      <p>{props.index} will spawn at timestamp: {spawnTimestamp}</p>
      <p>{props.index} will spawn at in {spawnSecondsFromNow} seconds</p>
    </div>
  )
}