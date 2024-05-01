"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { updateQuestionData } from '@/actions/question.action';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const EditOptionBox = () => {

}


const EditQuestionBox = ({ question }) => {
    const [editOn, setEditOn] = useState(true);
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        question: question.question,
        correctoption: question.correctoption,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        marksForQuestion: question.marksForQuestion
    })
    const divRef = useRef(null);


    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        const res = await updateQuestionData(formData, question._id)
        if (!editOn) {
            setEditOn(true);
        }
        toast({
            title: "Question updated Successfully ",
        })

    }
    const handleDelete = async (e) => {

    }
    const handleEdit = async (e) => {
        setEditOn(prev => !prev)
    }

    return (
        <div className='w-full'>
            {editOn ? (
                <div className='md:flex md:justify-center'>
                    <div className='  md:w-[610px] border-2 p-1 rounded-xl'>
                        <div className='flex flex-row  items-center  justify-end'>

                            {
                                editOn ? <Button onClick={handleEdit} className="bg-blue-500 w-[70px] text-white hover:bg-blue-700 mr-1">Edit</Button> :
                                    <Button onClick={handleSubmit} className="bg-green-500 w-[70px] text-white hover:bg-green-700 mr-1">Save</Button>
                            }

                            <Button className="bg-red-500 w-[70px] text-white hover:bg-red-700">Delete</Button>
                        </div>
                        <div className="mr-2">
                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="question">  Question
                            </label>
                            <div class="text-black break-normal h-auto ">
                                <p className='break-all h-auto'>
                                   {question.question}
                                </p>
                            </div>

                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionA">
                                Option A
                            </label>
                            <div className='w-full border-2 p-2 m-1 rounded-xl '>{question.optionA}</div>
                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionB">
                                Option B
                            </label>
                            <div className='w-full border-2 p-2 m-1 rounded-xl '>{question.optionB}</div>
                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionC">
                                Option C
                            </label>
                            <div className='w-full border-2 p-2 m-1 rounded-xl '>{question.optionC}</div>
                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionD">
                                Option D
                            </label>
                            <div className='w-full border-2 p-2 m-1 rounded-xl '>{question.optionD}</div>
                        </div>
                    </div>
                </div>
            ) : (
                // Your other content goes here
                <div className='md:flex md:justify-center'>

                    <div className='  md:w-[610px] p-2 border-2 rounded-xl'>
                        <div className='flex flex-row  items-center  justify-end'>

                            {
                                editOn ? <Button onClick={handleEdit} className="bg-blue-500 w-[70px] text-white hover:bg-blue-700 mr-1">Edit</Button> :
                                    <Button onClick={handleSubmit} className="bg-green-500 w-[70px] text-white hover:bg-green-700 mr-1">Save</Button>
                            }

                            <Button className="bg-red-500 w-[70px] text-white hover:bg-red-700">Delete</Button>
                        </div>
                        <div className='border-2 mt-2 p-2'>
                            <label class="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                                Add question
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="question"
                                value={formData.question}
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
                                value={formData.optionA}
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
                                value={formData.optionB}
                                id="optionB"
                                name="optionB"
                                type="text"
                                placeholder="Option B"
                            />

                            <label className="block mt-2 text-gray-700 text-sm font-bold mb-2" htmlFor="optionC">
                                Option C
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleChange}
                                value={formData.optionC}
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
                                value={formData.optionD}
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
                                value={formData.correctoption}
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
                                value={formData.marksForQuestion}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="marksForQuestion"
                                name="marksForQuestion"
                                type="text"
                                placeholder="marks"
                            />


                            <div className='flex flex-row justify-end'>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditQuestionBox;
