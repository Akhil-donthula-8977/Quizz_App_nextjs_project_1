"use server"

import { SelectedAnswer } from "@/app/(models)/selectedAnswer";
import { handleError } from "./quizz.action";
import { connectToDB } from "@/lib/db";
import { Question } from "@/app/(models)/question";
import { revalidatePath, revalidateTag } from "next/cache";

export  async function selectOptionForQuestion(quizzId,quesId,option,studentId){
    try{
      await connectToDB()
        const ans=await SelectedAnswer.find({quizzId:quizzId,studentId:studentId,questionId:quesId})
        let res;
        console.log(option)
       if(ans.length>0){
        res=await SelectedAnswer.updateOne(ans,{option:option});
       }
       else{
        res=await SelectedAnswer.create({
            quizzId:quizzId,
            studentId:studentId,
            questionId:quesId,
            option:option
         })
       }
       console.log(res)
       return JSON.parse(JSON.stringify(res));
    }
    catch(e){
          console.log(e)
    }
}



export async function getAllQuestionsOfQuizz(quizCode){
  try{
   await connectToDB();
   const res=await Question.find({quizz:quizCode});
  return JSON.parse(JSON.stringify(res));
  }
  catch(e){

  }
}

export async function updateQuestionData(formData,quesID){
  try{
   
   const res=await Question.updateMany({_id:quesID},{...formData})
   console.log(res);
   revalidatePath("/exams")
  
   return JSON.parse(JSON.stringify(res));
  }
  catch(e){

  }
}