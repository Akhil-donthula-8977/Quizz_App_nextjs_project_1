"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import { useDebounce } from "use-debounce";
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getResultData } from '@/actions/results.action';
const page = () => {
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);
  const [resultData, setResultData] = useState([]);
  const params=useParams();
  const {data:session,status}=useSession();
  useEffect(() => {
    const getResults = async () => {
      const data=await getResultData(session?.user?._id)
    };
  let check=true;
  if(check){
    getResults().then((e)=>{
      setResultData(e)
    }); 
  }
  return ()=>{
    check=!check;
  }
  
  }, []);
  
  useEffect(() => {
    const getData = setTimeout(() => {
      // request
    }, 2000)
}, [])

  return (
    <section className='flex flex-row justify-center'>
     <div className='flex'>
      <input type="text" name="result" className='text-[14px]  md:w-[400px] w-[250px] rounded-[4px] m-1 border-2 bg-gray-100 h-[30px]' 
      placeholder='search for exam result'
      ></input>
      <Button className="text-white bg-blue-600 hover:bg-blue-700 md:h-[30px]">Search</Button>
      </div>
      {
        
      }
    </section>
  )
}

export default page