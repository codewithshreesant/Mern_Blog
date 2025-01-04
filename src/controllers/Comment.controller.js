import { Comment } from "../models/Comment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment=asyncHandler(
    async (req,res)=>{
        const {comment, userId, postId}=req.body;

        if(
            [comment,userId,postId].some((field)=>{
                return field==""
            })
        ){
            throw new ApiError(
                401,
                "All fields are required"
            )
        }

        const newComment=await Comment.create({
            comment,
            userId,
            postId
        })

        const saveComment=await newComment.save();

        res.status(200)
        .json(
            new ApiResponse(
                200,
                saveComment
            )
        )
        
    }
)

const getAllComments=asyncHandler(
    async (req,res)=>{
        const comments=await Comment.find({});
        if(!comments)
        {
            throw new ApiError(
                402,
                "No comments found "
            )
        }

        res.status(200)
        .json(
            200,
            comments
        )
    }
)

const deleteComment=asyncHandler(
    async(req,res)=>{
        const {id}=req.params;
        const deletedComment=await Comment.findByIdAndDelete({_id:id});
        if(!deletedComment)
        {
            throw new ApiError(
                401,
                "No deleted Comment "
            )
        }

        res.status(200)
        .json(
            200,
            deletedComment 
        )

    }
)

export {createComment, getAllComments, deleteComment} 