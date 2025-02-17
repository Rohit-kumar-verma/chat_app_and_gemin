import express, { json } from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import projectRouter from './routes/project.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

connect();

const app =express()

app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/users', userRoutes)
app.use('/projects', projectRouter)
// app.get('/', (req,res)=>{
//     res.send("hi")
// })

export default app 