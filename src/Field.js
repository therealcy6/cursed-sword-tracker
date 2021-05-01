import React from 'react'
import  'firebase/database'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import CountDownTimer from './CountdownTimer.js'

export default function Field(props) { 
  useFirebaseConnect([`chronos`])
  const chronos = useSelector((state) => state.firebase.data["chronos"])

  if (!isLoaded(chronos)) {
    return <div>Loading...</div>
  }

  if (isEmpty(chronos)) {
    return <div>Observed Data Is Empty</div>
  }
  return (
      <CountDownTimer offset={props.offset} name="Akamanah Chest" until={chronos["akachest"]}></CountDownTimer>
  )
}
