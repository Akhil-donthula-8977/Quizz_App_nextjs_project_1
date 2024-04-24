import mongoose, { mongo } from "mongoose"
const questionSchema=new mongoose.Schema({
 question:{
    type:String
 },
 correctoption:{
    type:String,
    min:10,
    max:2000
 },
optionA:{
   type:String
},
optionB:{
   type:String
},
optionC:{
   type:String
},
optionD:{
   type:String
},
 quizz:[{type:mongoose.Schema.Types.ObjectId,ref:"Quizz"}],
  marksForQuestion:{
    type:Number
  },
})

export const Question=mongoose.models.Question|| mongoose.model("Question",questionSchema,"Question");
