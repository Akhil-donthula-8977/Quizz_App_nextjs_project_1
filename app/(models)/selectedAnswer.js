import mongoose from "mongoose";

const selectedAnswerSchema=new mongoose.Schema({
     quizzId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quizz"
     },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question"
    },
    option:{
        type:String
    }

},{
    timestamps: true 
})
export const SelectedAnswer= mongoose.models.SelectedAnswer || mongoose.model("SelectedAnswer",selectedAnswerSchema,"SelectedAnswer");
