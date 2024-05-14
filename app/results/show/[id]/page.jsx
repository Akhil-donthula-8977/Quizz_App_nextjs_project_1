import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getQuizzResultSummary } from '@/actions/results.action'
import ResultOptionCard from '../../(utils)/ResultOptionCard'
const page = async ({ params }) => {
  const session = await getServerSession(options)
  const data = await getQuizzResultSummary(session?.user?._id, params.id)
  return (
    <div className='flex justify-center sm:min-w-[600px]'>
    <div className='flex flex-center flex-col'>
      {
        data.map((e) => {
          return (
            <ResultOptionCard data={e}></ResultOptionCard>
          )
        })
      }
    </div>
    </div>
  )
}

export default page