import React from 'react'
import { useSelector } from 'react-redux'
const Dashboards = () => {

    const {user} = useSelector((state) => state.auth)
    console.log(user)
  return (
    <div>Dashboards</div>
  )
}

export default Dashboards