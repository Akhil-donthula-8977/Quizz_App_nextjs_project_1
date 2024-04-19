import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


const ScheduleCard = (props,role) => {
    return (
        <div className='border md:max-w-[1200px] m-1 mt-3  p-3 bg-gray-100  border-gray-300 rounded-[10px]'>
            <h1 className='md:text-2xl sm:text-sm font-bold'>{props.data.quizName}</h1>
            <div className='flex justify-between '>
                <h3 className='m-1'>{props.data.incharge}</h3>
                <h3>{props.data.time}</h3>
            </div>
            <div className='flex flex-col '>
                <div className='flex'><h3 className='text-red-500 ml-1'>Deadline: </h3><h3 className='ml-1'> {props.data.deadline}</h3></div>

            </div>
           <Link href={`/exams/${props.data.id}`} className='m-1'> <Button variant="outline">Attempt</Button></Link>

        </div>
    )
}

export default ScheduleCard