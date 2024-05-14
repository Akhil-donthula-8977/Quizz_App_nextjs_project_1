import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Button } from '@/components/ui/button';
import React from 'react'
import { getExamData } from '@/actions/quizz.action';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import ExamComponent from '../(utils)/ExamComponent';
import { studentExamAttempt } from '@/actions/studentAction';
import { unstable_noStore as noStore } from 'next/cache';
// student attempt
export default async function page({ params }) {
  noStore();
  const session = await getServerSession(options)
  const [data, checkSubmitted] = await Promise.all([getExamData(params.code), studentExamAttempt(params.code, session?.user?._id)])
  if (checkSubmitted?.submittedQuizzes?.length > 0) {
    return (<>
      <p>already submitted</p>
    </>)
  }
  if (session?.user?.role == "TEACHER") {
    return (<><p>null</p></>)
  }
  return (
    <div>
      <ExamComponent data={data} ></ExamComponent>
    </div>
  )
}
