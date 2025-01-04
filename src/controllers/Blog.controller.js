import { Blog } from "../models/Blog.model.js";
import { Comment } from "../models/Comment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost=asyncHandler(
    async (req,res)=>{
        const {title, description, content, coverImg, author}=req.body;

        if(
            [title,description,content,coverImg,author].some((field)=>{
                return field==""
            })
        ){
            throw new ApiError(
                401,
                "All fields are  required"
            )
        }

        const newPost=await Blog.create({
            title,description,content,coverImg,author
        })

        const post=await newPost.save();

        res.status(200)
        .json(
            new ApiResponse(
                200,
                post
            )
        )

    }
)

const getAllPosts=asyncHandler(
    async (req,res)=>{
        const posts=await Blog.find({});
        if(!posts)
        {
            throw new ApiError(
                402,
                "NO posts found"
            )
        }
        res.status(200)
        .json(
            new ApiResponse(
                200,
                posts
            )
        )
    }
)

const getSinglePost=asyncHandler(
    async (req,res)=>{
        const {postId}=req.params;
        const singleBlog=await Blog.findById({_id:postId});
        if(!singleBlog)
        {
            throw new ApiError(
                401,
                "NO BLOGS FOUND"
            )
        }
        
        const comment=await Comment.find({postId});

        res.status(200)
        .json(
            200,
            {singleBlog, comment}
        )
    }
)

const updateBlog=asyncHandler(
    async (req,res)=>{
        const {id}=req.params;
        const updatedpost=await Blog.findByIdAndUpdate(
            {_id:id},
            {...req.body},
            {new:true}
        )
    
    if(!updatedpost)
    {
        throw new ApiError(
            402,
            "Post not updated"
        )
    }

    res.status(200)
    .json(
        new ApiResponse(
        200,
        updatedpost
        )
    )
}
)

const deleteBlog=asyncHandler(
    async (req,res)=>{
        const {id}=req.params;
        const deletedBlog=await Blog.findByIdAndDelete({_id:id});

        if(!deletedBlog)
        {
            throw new ApiError(
                401,
                "No post found to delete "
            )
        }
        const deleteComment=await Comment.deleteOne({postId:id});
        res.status(200)
        .json(
            new ApiResponse(
                200,
                {deletedBlog, deleteComment}
            )
        )

    }
)

const relatedBlog=asyncHandler(
    async (req,res)=>{
        const {id}=req.params;
        const post=await Blog.findById({_id:id});
        if(!post){
            throw new ApiError(
                401,
                "NO post found with that particular id "
            )
        }

        const {title, content}=post;

        const relatedTitle=new RegExp(title.split('').join('|'));
        const relatedContent=new RegExp(content.split('').join('|'));

        const relatedQuery={
            title:{$regex:relatedTitle},
            content:{$regex:relatedContent}
        }

        const relatedPosts=await Blog.find({
            $or:[relatedQuery]
        })

        res.status(200)
        .json(
            new ApiResponse(
                200,
                relatedPosts
            )
        )

    }
)

export {createPost, getAllPosts, getSinglePost, relatedBlog, deleteBlog, updateBlog};