import React from 'react'
import NavBar from '../(components)/NavBar'

const layout = ({children}) => {
  return (
    <div>
    <NavBar></NavBar>
    {children}
        </div>
  )
}

export default layout