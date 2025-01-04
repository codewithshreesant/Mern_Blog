import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
export const verifyToken=async (req,res,next)=>{
    try {
        const token=req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if(!token)
        {
            throw new ApiError(
                402,
                "Token not found "
            )
        }

        const {_id, isAdmin}=jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!id)
        {
            throw new ApiError(40,"invalid token ");
        }

        req.userId=_id;
        req.Admin=isAdmin;

        next();

    } catch (error) {
        res.status(400).json({"error":error.message})
    }
}