import ApiError from "../utils/ApiError.js"

export const verifyAdmin=async (req,res,next)=>{
    try {
        if(req.isAdmin!==true)
        {
            throw new ApiError(401,"not an admin ")
        }
        next();
    } catch (error) {
        console.log("Error while verifying Admin ", error.message);
    }
}