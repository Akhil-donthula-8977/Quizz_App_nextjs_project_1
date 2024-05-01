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
            <h1 className='md:text-2xl sm:text-xl text-md font-bold'>{props.data.quizzName}</h1>
            <div className='flex flex-col '>
                <div className='flex flex-row items-center'>
                    <h3 className='text-red-500 ml-1 text-[10px] sm:text-[16px]'>Deadline:</h3>

                    <h3 className='ml-1 text-[10px] sm:text-[16px]'> {dateFormatter(props.data.deadline.toString())}</h3>


                </div>
                <h3 className='ml-1 text-[10px] sm:text-[16px]' >{props.data._id}</h3>
                <div className='flex flex-row items-center'>
                    <h3 className='text-red-500 ml-1 text-[10px] sm:text-[14px]'>start time: </h3><h3 className='ml-1 text-[10px] sm:text-[14px]'> {props.data.startTime}</h3>
                </div>
            </div>
            {
                session?.user?.role === "TEACHER" ?
                    <div className='flex flex-row items-center flex-wrap gap-2'>
                        <Link href={`/exams/${props.data._id.toString()}/add`} className=''>
                            <Button variant="outline" className="md:w-[100px]  h-[10px]  text-[10px] md:text-[12px] p-2 md:p-3">Add Questions</Button>
                        </Link>
                        <Link href={`/exams/${props.data._id.toString()}/edit`} className=''>
                            <Button variant="outline" className="md:w-[100px]  hover:bg-blue-600  h-[10px] text-[10px] md:text-[12px] p-2 md:p-3 ">Edit Questions</Button>
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