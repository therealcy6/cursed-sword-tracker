import React from 'react'
import  'firebase/database'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export default function CountDownTimer() {
    useFirebaseConnect([
      'chronos'
    ])
  
    const chronos = useSelector((state) => state.firebase.ordered.chronos)
  
    if (!isLoaded(chronos)) {
      return <div>Loading...</div>
    }
  
    if (isEmpty(chronos)) {
      return <div>Chronos Data Is Empty</div>
    }
  
    return (
      <div>
          <p>value is {chronos[0]["value"]} </p>
      </div>
    )
  }
