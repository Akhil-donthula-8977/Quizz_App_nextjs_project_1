"use client"
import React from 'react'

const page = () => {
  React.useEffect(() => {
    const getData = setTimeout(() => {
      // request
    }, 2000)
}, [])

  return (
    <section className='flex flex-row justify-center'>
     
      <input type="text" name="result" className='w-[400px] rounded-[4px] m-1 border-2 bg-gray-100 h-[30px]' ></input>
    
    </section>
  )
}

export default page