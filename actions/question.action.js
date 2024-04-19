"use server"

import { SelectedAnswer } from "@/app/(models)/selectedAnswer";
import { handleError } from "./quizz.action";
import { connectToDB } from "@/lib/db";

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