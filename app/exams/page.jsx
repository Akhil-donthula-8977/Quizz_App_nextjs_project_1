import { fetchExamsSchedules, getQuizzesByTeacherId } from '@/actions/quizz.action'
import ScheduleCard from '../(components)/Quizz/ScheduleCard';
import { getServerSession } from 'next-auth'
import React from 'react'
import { Button } from '@/components/ui/button';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import QuizzCard from '../(components)/Quizz/quizzCard';
import { unstable_noStore as noStore } from 'next/cache';
const Modal = dynamic(() => import("./(utils)/AddDialog"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})
const page = async () => {
  const session = await getServerSession(options)
  if (!session) {
    return redirect("/auth/signIn?callbackUrl=/exams")
  }
  if(session?.user?.role=="TEACHER"){
    const data=await getQuizzesByTeacherId(session?.user?._id);
      return(
        <section className='md:flex flex-col mt-5 justify-center  '>
       <Link className='w-full flex flex-row justify-center' href="/exams/create"> <Button className="p-5 w-1/3  bg-black text-white border-black border-[1px] 
           hover:bg-white hover:text-black ">Create a Exam <div className='text-white '>+</div></Button>
           </Link>
         <div className="flex flex-col  items-center">{
          data.map((e)=>{
            return <div key={e._id} className='w-1/2'><QuizzCard  data={e}></QuizzCard></div>
          })
         }</div>
          <div></div>
        </section>
      )     
  }
  noStore();
  const schedules = await fetchExamsSchedules(session?.user?._id);
  return (
    <>
      <div className='md:flex mt-10  justify-center'>
        <div className='md:w-[1000px]'>
       <Modal></Modal>
            <div>
          {
            schedules.map((e) => {
              return <ScheduleCard data={e}></ScheduleCard>
            })
          }
          </div>
          </div>
      </div>
    </>
  )
}

export default page