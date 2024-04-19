import mongoose from "mongoose";

const selectedAnswerSchema=new mongoose.Schema({
     quizzId:{
        type:mongoose.Schema.Types.ObjectId
     },
    studentId:{
        type:mongoose.Schema.Types.ObjectId
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId
    },
    option:{
        type:String
    }

},{
    timestamps: true 
})
export const SelectedAnswer= mongoose.models.SelectedAnswer || mongoose.model("SelectedAnswer",selectedAnswerSchema);
