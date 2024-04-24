"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { emailQueue } from "../../api/queues/result"
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ExamOption from './ExamOption';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useParams, useRouter } from 'next/navigation';
import { submitQuizz } from '@/actions/studentAction';
import { useSession } from 'next-auth/react';
import { getResultData } from '@/actions/results.action';

const arr = ["optionA", "optionB", "optionC", "optionD"];
const QuestionOptions = ({ quizcode,questions, activeQuestion }) => {
    const [selectedAnswer, setSelectedAnswer] = useState({})
  const router=useRouter()
  const {data:session,status}=useSession()

  const handleSubmit=async function(e){
   const res = await submitQuizz(quizcode, session?.user?._id);
   if(res){
      //  router.query.submitted = "True"
      //await emailQueue.enqueue(quizcode,{delay:"1h"})
     await getResultData(session?.user?._id,quizcode)
     router.replace(`/exams`);
    }
  }
    return (
        <>
            <div className='border-2 rounded-[5px] m-2 sm:w-3/4 w-full'>
                <p className='ml-1'>Question:</p>
                <div name="question" className='p-2 text-md border border-2 rounded-[9px] m-1'>
                    {questions[activeQuestion].question}
                </div>
                {arr.map((option, index) => (
                    <React.Fragment key={index}>
                        <ExamOption questions={questions} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} activeQuestion={activeQuestion} option={option} ></ExamOption>
                    </React.Fragment>
                ))}

                <div className='flex justify-between '>
                    <Button className="bg-red-400 m-2 text-white hover:bg-red-700" onClick={handleSubmit}  >Submit</Button>
                    <Button className="bg-blue-400 m-2 text-white hover:bg-blue-700" >Next</Button>
                </div>
            </div>
        </>
    )
}
const ExamComponent = ({ data }) => {
    const [start, setStart] = useState(true);
    const [questions, setQuestions] = useState(data[1]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const handle = useFullScreenHandle();
    const params=useParams();
    if (start) {
        return (
            <div>
                <Button
                    onClick={() => {
                        handle.enter
                        setStart(false);
                    }}
                    className="bg-blue-600 text-white hover:bg-blue-800"
                >
                    Start Exam
                </Button>
            </div>
        );
    }

    return (
        <FullScreen handle={handle}>
            <section className='w-full'>
                <div className='flex md:flex-row flex-col items-center md:items-start'>
                    <div className='border-2 mt-2 ml-2 h-full flex-wrap md:w-1/4 w-full  '>
                        <div className='md:flex flex-row justify-start  hidden  '>
                            {questions.map((_, index) => (
                                <Button className={`bg-blue-500 m-1  ${activeQuestion==index?"bg-green-500 hover:bg-green-500":"hover:bg-blue-700"}`} key={index} onClick={() => setActiveQuestion(index)}>
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                        <div className=" ">
                            <Sheet >
                                <SheetTrigger className='bg-red-400 p-1 rounded-[5px]  md:hidden block '>Questions</SheetTrigger>
                                <SheetContent className="bg-white">
                                    <SheetHeader>
                                        <SheetTitle>Questions</SheetTitle>
                                        <SheetDescription>
                                            <div className='md:flex flex-row justify-start  w-full'>
                                                {questions.map((_, index) => (
                                                    <Button className={`bg-blue-500 m-1  ${activeQuestion==index?"bg-green-500 hover:bg-green-500":"hover:bg-blue-700"}`} key={index} onClick={() => setActiveQuestion(index)}>
                                                        {index + 1}
                                                    </Button>
                                                ))}
                                            </div>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <QuestionOptions quizcode={params.code} questions={questions} activeQuestion={activeQuestion}></QuestionOptions>
                </div>
            </section>
        </FullScreen>
    );
};

export default ExamComponent;
