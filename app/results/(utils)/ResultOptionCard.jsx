import React from 'react'
import { answersConstant } from '@/constants'

const ResultOptionCard = ({ data }) => {
  return (
    <div className='w-full'>
      <div className=' mb-1 text-md'>{data.questionId.question}</div>  
      <h3 className='text-sm'>Correct option:</h3>
      <div className='m-2 border-2 p-1 text-sm bg-green-300 rounded-[4px]'>
        {data.questionId[answersConstant[data?.questionId.correctoption]]}
      </div>
      <h3 className='text-sm'>Selected option:</h3>
      <div className={`m-2 border-2 p-1 text-sm rounded-[4px]
        ${data.questionId[answersConstant[data?.questionId.correctoption]] === data.questionId[data?.option] ? "bg-green-300" : "bg-red-300"}`}>
        {data.questionId[data?.option]}
      </div>
    </div>
  )
}

export default ResultOptionCard;
