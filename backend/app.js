import express, { json } from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

connect();

const app =express()

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/users', userRoutes)
// app.get('/', (req,res)=>{
//     res.send("hi")
// })

export default app 