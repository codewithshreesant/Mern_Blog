import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken=async (id)=>{
    const user=await User.findById({_id:id});

    const token=user.generateToken();
    user.save({validateBeforeSave:false});
    return {token}
}

const createUser=asyncHandler(
    async(req,res)=>{
        const {username, email, password}=req.body;

        if(
            [username, email, password].some((field)=>{
                return field==""
            })
        ){
            return new  ApiError(
                402,
                "All fields are requied "
            )
        }

        const isCreateUser=await User({email:email});

        if(isCreateUser.length > 0)
        {
            throw new ApiError(
                401,
                "User already exists "
            )
        }

        const newUser=await User.create(
            {
                username,
                email,
                password
            }
        )

        const savedUser=await newUser.save();

        res.status(200)
        .json(
            new ApiResponse(
                200,
                savedUser
            )
        )
    }
)

const loginUser=asyncHandler(
    async(req,res)=>{
        const {email, password}=req.body;
        if(
            [email,password].some((field)=>{
                return field==""
            })
        ){
            throw new ApiError(
                401,
                "email and password is required "
            )
        }
        
        const isRegisteredUser=await User.find({email:email});
       
        if(!isRegisteredUser)
        {
            throw new ApiError(
                402,
                "Please Signup first to Login "
            )
        }
        const isPasswordCorrect=await isRegisteredUser[0].checkPassword(password);

        if(!isPasswordCorrect)
        {
            throw new ApiError(
                402,
                "Incorrect Password !"
            )
        }

        const {token}=await generateToken(isRegisteredUser[0]._id);

        res.cookie("token", token, 
            {
                httpOnly:true,
                secure:true 
            }
        )

        res.status(200)
        .json(
            new ApiResponse(
                200,
                {message:"Login Successfull ",token}
            )
        )
    }
)

const getAllUsers=asyncHandler(
    async(req,res)=>{
        const users=await User.find({});
        if(!users)
        {
            throw new ApiError(
                401,
                "No Users found "
            )
        }
        res.status(200)
        .json(
            new ApiResponse(
                200,
                users 
            )
        )
    }
)

const logoutUser=asyncHandler(
    async(req,res)=>{
        res.clearCookie('token');
        res.status(200)
        .json(
            new ApiResponse(
                200,
                "User Logged Out Successfully "
            )
        )
    }
)

export {createUser, loginUser,logoutUser, getAllUsers};