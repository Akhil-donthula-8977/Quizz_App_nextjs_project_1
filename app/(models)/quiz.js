import mongoose from "mongoose";

const QuizzSchema=new mongoose.Schema({
    quizzName:{
        type:String,
    },
    incharge:{
        type:mongoose.Schema.Types.ObjectId
    },
    deadline:{
        type:Date
    },
    noOfQuestions:{
        type:Number
    },
    startTime:{
        type:String
    },
    endTime: {
        type:String
    },
    noOfMarks:{
        type:Number
    }

},{
    timestamps: true 
})
export const Quizz= mongoose.models.Quizz || mongoose.model("Quizz",QuizzSchema);
