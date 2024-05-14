"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAllResultData } from "@/actions/results.action";
import { unstable_noStore as noStore } from "next/cache";
import { CircularProgressbar } from "react-circular-progressbar";
import ResultDataCard from "./(utils)/ResultDataCard";
import { useRouter } from "next/navigation";
import { RotatingLines } from 'react-loader-spinner'

const Loader=()=>{
  return(
    <div className="w-full h-full flex justify-center items-center">
      <RotatingLines
    visible={true}
    height="96"
    width="96"
    color="black"
    strokeWidth="2"
    animationDuration="0.75"
    ariaLabel="rotating-lines-loading"
    wrapperStyle={{}}
    wrapperClass=""
  />
    </div>
  )
}

const Page = () => {
  const router = useRouter()
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);
  const [resultData, setResultData] = useState(undefined);
  const params = useParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  noStore();

  useEffect(() => {

    const fetchData = async (id) => {
      try {
        const dataa = await getAllResultData(id);
        setResultData(dataa);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setLoading(true)
    if (status === "loading") {
      return;
    }
    if (session?.user?._id) {
      fetchData(session?.user?._id);
      setLoading(false)
    }
  }, [session, status]);

  const value = 0.26;
  if (loading) {
    return <Loader></Loader>
    
  }
  if(resultData?.length==0){
    return <p>No Items are found</p>
  }

  return (

    <section className="flex flex-col items-center overflow-hidden justify-center">
      <div className="flex">
        <input
          type="text"
          name="result"
          className="md:text-[14px] sm:text-[10px] sm:m-2 md:w-[400px] w-[200px] rounded-[4px] m-1 border-2 bg-gray-100 md:h-[35px] h-[20px]"
          placeholder="search for exam result"
        ></input>
        <Button className="text-white bg-blue-600 hover:bg-blue-700 md:h-[30px] sm:text-[8px] h-[22px]">
          Search
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center md:max-w-[800px]">
        {resultData ? (
          resultData.map((e) => (
            <ResultDataCard key={e._id} data={e}></ResultDataCard>
          ))
        ) : (
          <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="black"
        strokeWidth="2"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
        )}



      </div>
    </section>

  );
};

export default Page;