import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'
import { useEffect } from 'react'




const Dashboards = () => {

  const chat = useChat()
  
    const {user} = useSelector((state) => state.auth)
    console.log(user)

    useEffect(()=>{
      chat.initializeSocketConnection()
    })
  return (
    <div>Dashboards</div>
  )
}

export default Dashboards