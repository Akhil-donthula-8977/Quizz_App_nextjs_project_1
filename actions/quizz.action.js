"use server"
import { connectToDB } from "@/lib/db";
import { quizData ,quizSchedules} from "@/lib/fakeData";
import { unstable_cache } from "next/cache";
import { Quizz } from "@/app/(models)/quiz";
import { Question } from "@/app/(models)/question";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { Student } from "@/app/(models)/student";
export const handleError = (error) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  }
export async function fetchExamsSchedules(sessionId){
 await  connectToDB();
 const data = await Student.findById(sessionId)
 .populate("quizzes")
 .populate("submittedQuizzes")
 .exec();

  console.log("dataa",data);
   return quizSchedules;
}

export async function fetchExamData({id}){
    return quizData
}
export const getExamData = unstable_cache(
  async (id) => {
    try{
         await connectToDB();
         const data=await Promise.all([
            Quizz.findById(id),
            Question.find({quizz:id})
         ]).then((values)=>values)
         console.log(data)
         return JSON.parse(JSON.stringify(data));

    }
    catch(e){
          handleError(e);
    }
  },
  ['StudentExam']
);

export async function addQuizz(data){
    try{
    await connectToDB()
    const quizz=await Quizz.create(data);
    revalidatePath('/');
    return JSON.parse(JSON.stringify(quizz)); 
    }
     catch(e){
        throw new error(e);
     }
}


export async function getQuizzesByTeacherId(id){
    try{
      await connectToDB();
      const data=await Quizz.find({incharge:id})
      
      return data    
    }
    catch(e){
      handleError(e);
    }
}

export async function getSubmittedQuizzes(id){
  try{
      
  }
  catch(e){
    console.log(e);
  }
}


export async function addQuestionToQuizz(data,id){
  try{
     await connectToDB();
     const createQuestion=await Question.create(data);
     createQuestion.quizz.push(id);
    await createQuestion.save()
    revalidatePath("/");
    return JSON.parse(JSON.stringify(createQuestion));
      
  }
  catch(e){
    handleError(e);
  }
}