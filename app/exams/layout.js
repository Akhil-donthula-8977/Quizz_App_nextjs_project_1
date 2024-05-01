import { getServerSession } from 'next-auth'
import React from 'react'
import NavBar from '../(components)/NavBar'
import { headers } from 'next/headers';
const layout =async ({children}) => {
  const session=await getServerSession()
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";
  
  return (
    <>
     {session?.user && <NavBar></NavBar>}
        {children}
    </>
  )
}

export default layout