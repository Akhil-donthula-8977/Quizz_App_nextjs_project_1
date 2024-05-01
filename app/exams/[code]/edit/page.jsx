import React from 'react'
import { getAllQuestionsOfQuizz } from '@/actions/question.action';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { unstable_noStore } from 'next/cache';
import EditComponent from '../../(utils)/editExam/EditComponent';
const page = async ({params}) => {
  // unstable_noStore()
  const [getAllQuestionData,session]=await Promise.all([getAllQuestionsOfQuizz(params.code),getServerSession(options)]);
  if(session?.user?.role=="STUDENT"){
    redirect("/")
  }
  return (
    <div>

        <EditComponent questions={getAllQuestionData} ></EditComponent>
        
    </div>
  )
}

export default page