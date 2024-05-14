import { getQuizzResultSummary } from '@/actions/results.action'
import { options } from '@/app/api/auth/[...nextauth]/options'
import Modal from '@/app/results/(utils)/Modal'
import ResultOptionCard from '@/app/results/(utils)/ResultOptionCard'
import { getServerSession } from 'next-auth'
import React from 'react'
const page =async ({params}) => {
  const session=await getServerSession(options)
  const data=await getQuizzResultSummary(session?.user?._id,params.id)
  return (
    <div className='flex justify-center items-center absolute'>.
    <Modal>
        <div className='scroll h-full rounded-[10px] overflow-y-scroll p-2 bg-white w-full  '>
            <h1 className='text-[25px] font-bold text-center'>Summary</h1>
              {
                data.map((e)=>{
                  return (
                    <ResultOptionCard data={e}></ResultOptionCard>
                  )
                })
              } 
        </div>
    </Modal>
    </div>
  )
}

export default page