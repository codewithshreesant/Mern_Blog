
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.generateToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this._email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:process.env.JWT_EXPIRY
        }
    )
}

userSchema.methods.checkPassword=async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User=mongoose.model('User', userSchema);

