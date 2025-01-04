
import mongoose,{Schema}  from 'mongoose'

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    coverImg:{
        type:String,
        required:true
    },
    author:{
        type:"String"
    },
    rating:Number
},
{
    timestamps:true
}
)

export const Blog=mongoose.model('Blog', blogSchema)

