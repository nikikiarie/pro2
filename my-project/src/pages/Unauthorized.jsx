import React from 'react'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'

const Unauthorized = () => {
  return (
    <div>
      <Announcement/>
      <NavBar/>
      <h4>Unauthorized</h4>
    </div>
  )
}

export default Unauthorized