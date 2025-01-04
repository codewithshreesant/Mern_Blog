import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './src/DbConfig/index.js';
import blogRouter from './src/routes/Blog.route.js'
dotenv.config();
const app=express();

app.use(express.static('public'))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.json({limit:"20kb"}))
app.use(cors())
app.use(cookieParser())

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`The server is listening at PORT ${process.env.PORT || 3000}`);
    })
})
.catch((error)=>{
    console.log(`The error occured  while connecting  to database ${error.message}`)
})

app.use('/api/blogs', blogRouter) ;
