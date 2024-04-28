import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

import { dateFormatter } from '@/lib/utils/forms'
// for only TEACHERS
const QuizzCard = async (props) => {
    const session = await getServerSession(options);
    return (
        <div key={props.data._id.toString()} className='border md:max-w-[1200px] m-1 mt-3  p-3 bg-gray-100  border-gray-300 rounded-[10px]'>
            <h1 className='md:text-2xl sm:text-xl text-md font-bold'>{ props.data.quizzName}</h1>
            <div className='flex flex-col '>
                <div className='flex flex-row items-center'>
                    <h3 className='text-red-500 ml-1'>Deadline:</h3>
 
                    <h3 className='ml-1 text-sm'> {dateFormatter(props.data.deadline.toString())}</h3>
                    
                  
                </div>
                <h3 className='ml-1' >{props.data._id}</h3>
                <div className='flex flex-row items-center'>
                    <h3 className='text-red-500 ml-1'>start time: </h3><h3 className='ml-1 text-sm '> {props.data.startTime}</h3>
                </div>
            </div>
            {
                session?.user?.role === "TEACHER" ?
                <div>
                <Link href={`/exams/${props.data._id.toString()}/edit`} className='m-1'>
                        <Button variant="outline">Add Questions</Button>
                    </Link>
                    
                    </div> : (
                    <Link href={`/exams/${props.data.id.toString()}`} className='m-1'>
                        <Button variant="outline">Attempt</Button>
                    </Link>
                )
            }
        </div>
    )
}
export default QuizzCard