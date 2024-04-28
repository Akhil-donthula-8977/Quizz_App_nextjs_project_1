import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { dateFormatter } from '@/lib/utils/forms'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const ResultDataCard = (props) => {
    const value = (props.data.gainedMarks / props.data.totalMarks)
    const [color,setColor]=useState("");
    useEffect(()=>{
    if(value<30){
       setColor("red")
    }
    else if(value<70){
        setColor("yellow")
    }
    else{
        setColor("blue")
    }

    },[props])
    return (
        <div className='border md:w-[650px] sm:w-[350px] w-[320px] m-1 mt-3  p-3 bg-gray-100  border-gray-300 rounded-[10px]'>
            <div className='flex flex-row justify-between items-center '>
                <div className='flex flex-col items-start'>
                    <h1 className='md:text-2xl sm:text-xl text-md font-bold '>{props.data.quizId.quizzName}</h1>
                    <div className='flex justify-between '>
                        <h3 className='m-1'>{props.data.incharge}</h3>
                        <h3>{props.data.time}</h3>
                    </div>
                    <div className='flex flex-col justify-center items-center '>
                        <div className='flex'><h3 className='text-red-500 ml-1 sm:text-[16px] text-[12px]'>Deadline: </h3><h3 className='ml-1 text-[12px] sm:text-[16px]'> {dateFormatter(props.data.quizId.deadline)}</h3></div>
                    </div>
                    <Link href={`/results/${props.data._id}`} className='m-1'> <Button variant="outline" className="sm:w-[70px] sm:text-[14px] w-[40px] text-[12px] sm:h-[25px] h-[20px]">show</Button></Link>
                </div>
                <div>
                    <CircularProgressbar
                        value={value}
                        maxValue={1}
                        className="sm:w-[80px] sm:h-[80px] h-[80px]  text-green-200 "
                        text={`${value * 100}%`}
                        styles={buildStyles({
                            pathColor: `${color}`,
                            textColor: `${color}`,
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResultDataCard