import React from 'react'
import NavBar from '../(components)/NavBar'

const layout = ({children,modal}) => {
  return (
    <div>
    <NavBar></NavBar>
    {modal}
    {children}
  

        </div>
  )
}

export default layout