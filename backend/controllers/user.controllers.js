import User from "../models/user.model.js";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.services.js";
import {validationResult} from 'express-validator'
import redisClient from "../services/redis.sevice.js";

export const createUserController=async(req, res)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        const user= await userService.createUser(req.body)

        const token = await user.generateJWT()
        delete user._doc.password
        return res.status(200).json({user,token})

    } catch (error) {
        return res.status(400).send(error.message)
    }

}

export const userLoginController=async(req, res)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email, password}=req.body
    try{
        
        const user= await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(401).json({errors:"Invalied Credinatialas"})
        }
        
        const isMatch=await user.isValidPassword(password)
        if(!isMatch){
            return res.status(401).json({errors:"Invalied Credinatialas"})
        }

        const token=await user.generateJWT()   
        delete user._doc.password 
        res.status(200).json({user, token})

    }
    catch (error) {
        return res.status(400).send(error.message)
    }

}

export const profileController=async(req, res)=>{
    console.log(req.user)
return res.status(200).json(req.user)

}

export const logoutController=async(req,res)=>{
try {
    const token =req.cookies.token || req.headers.authorization.split(' ')[1];
    redisClient.set(token, 'logout', 'EX', 60*60*24)

    res.status(200).json({
        message:"Logged out successfull"
    })
    
} catch (error) {
    return res.status(400).send(error.message)
}
}