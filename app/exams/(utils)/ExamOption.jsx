import {selectOptionForQuestion} from '@/actions/question.action';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React from 'react';
const ExamOption = ({ questions, selectedAnswer, setSelectedAnswer,activeQuestion, option }) => {
    const {data:session}=useSession();
    const params=useParams()
    const handleClick =async (e) => {
      e.preventDefault();
      const res=await selectOptionForQuestion(params.code,questions[activeQuestion]._id,e.target.value,session?.user?._id)
      if(res){
           setSelectedAnswer(prev=>({
            ...prev,
            [activeQuestion]:e.target.value
           })) 
        }
      };
    return (
    <div>
      <label htmlFor={option} className="text-[14px] ml-1">{`${option}:`}</label>
      <button
      onClick={handleClick}
        name={option}
        value={option}
        className={`${
          selectedAnswer[activeQuestion] === option ? 'bg-green-300 hover:bg-slate-200' : ''
        } w-full text-start p-2 text-md border border-2 rounded-[9px] m-1`}
      >
        {questions[activeQuestion][option]}
      </button>
    </div>
  );
};

export default ExamOption;
