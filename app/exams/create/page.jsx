"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation';
import { addQuizz } from '@/actions/quizz.action';
const Page = () => {
  const [formData, setFormData] = useState({
    quizzName: '',
    deadline: '',
    startTime: '',
    endTime: '',
    noOfQuestions: 0,
  });
  const router=useRouter();
  const { data: session, status } = useSession()
  if(status=="unauthenticated"){
      router.push("/auth/signIn")
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res=await addQuizz({...formData,incharge:session?.user?._id,})
    console.log(res)
    if(res){
      return router.back()
    }
  };

  return (
    <main>
      <div className="flex justify-center h-full">
        <form
          className="bg-white shadow-md mt-3 rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="quizzName" className="block text-gray-700 text-sm font-bold mb-2">
              Quiz Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id=" quizzName"
              name="quizzName"
              type="text"
              placeholder="Enter Quiz Name"
              value={formData.quizzName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
              Deadline
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deadline"
              name="deadline"
              type="date"
              placeholder="Enter Deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
              Start Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startTime"
              name="startTime"
              type="time"
              placeholder="Enter Start Time"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">
              End Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endTime"
              name="endTime"
              type="time"
              placeholder="Enter End Time"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="noOfQuestions" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Questions
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noOfQuestions"
              name="noOfQuestions"
              type="number"
              placeholder="Enter Number of Questions"
              value={formData.noOfQuestions}
              onChange={handleChange}
            />
          </div>
         
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
