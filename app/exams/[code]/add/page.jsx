"use client"
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import { addQuestionToQuizz } from '@/actions/quizz.action';
import { useRouter } from 'next/navigation';
const page = ({params}) => {

  const router=useRouter();
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const res=await addQuestionToQuizz(formData,params.code)
     if(res){
      alert("question saved")
       router.push("/exams")
     }
  };
  return (
    <div>
        <div className='border-2 mt-2 p-2'>
              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Add question
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question"
                onChange={handleChange}
                name="question"
                type="text"
                placeholder="Enter  Question"
              />
              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionA">
                Option A
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                id="optionA"
                name="optionA"
                type="text"
                placeholder="Option A"
              />

              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionB">
                Option B
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                id="optionB"
                name="optionB"
                type="text"
                placeholder="Option B"
              />

              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionC">
                Option C
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                id="optionC"
                name="optionC"
                type="text"
                placeholder="Option C"
              />

              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionD">
                Option D
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                id="optionD"
                name="optionD"
                type="text"
                placeholder="Option D"
              />

              <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="correctoption">
                correctoption
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                id="correctoption"
                name="correctoption"
                type="text"
                placeholder="correct option"
              />
             <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="marksForQuestion">
                Mark for question
              </label>
              <input
                  onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="marksForQuestion"
                name="marksForQuestion"
                type="text"
                placeholder="marks"
              />


              <div className='flex flex-row justify-end'>
                <Button className="mt-2 bg-blue-600 text-white font-bold hover:text-blue-600 border-blue-600 border-[1px]"
                onClick={handleSubmit}> Add question</Button>
              </div>
            </div>
    </div>
  )
}

export default page