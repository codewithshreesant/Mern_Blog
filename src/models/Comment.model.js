
import mongoose,{Schema} from 'mongoose'

const commentSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    }
})


export const Comment=mongoose.model('Comment', commentSchema)   