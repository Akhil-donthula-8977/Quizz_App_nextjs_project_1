"use server"

import { Result } from "@/app/(models)/result";
import { SelectedAnswer } from "@/app/(models)/selectedAnswer";
import { connectToDB } from "@/lib/db"
const answersConstant={
    'a':"optionA",
    'b':"optionB",
    'c':"optionC",
    'd':"optionD"
}
async function ut(ansarr){
    let marks=0;
       for(i in answers){
            if(answersConstant[i.questionId.correctoption]==i.option)marks++;
        }
        return marks
}
export async function getResultData(userId, quizId) {
    try {
        await connectToDB();
   
     const [resultData, answers] = await Promise.all([
        Result.find({ studentId: userId }),
        SelectedAnswer.find({ studentId: userId })
          .select({ questionId: 1, option: 1 })
          .populate({
            path: 'questionId',
          }).exec()
      ]);
      if(resultData.length==0){
        console.log("entered")
        let marks=0;
        for (let i in answers) {
            if (answersConstant[answers[i].questionId.correctoption] == answers[i].option) marks++;
          }
          
        const res=await Result.create({
            quizId:quizId,
            studentId:userId,
            totalMarks:10,
            gainedMarks:marks  
        })
        console.log(res)
      }
    }
    catch (e) {

    }


}