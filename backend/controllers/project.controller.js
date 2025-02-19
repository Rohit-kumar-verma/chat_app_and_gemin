import projectModel from "../models/project.model.js";
import projectService from "../models/project.model.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const createProject=async (req,res)=>{
    const errors= validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        
        const {name}= req.body
        const loggedInUser= await userModel.findOne({email:req.user.email})
        const userId= loggedInUser._id
        const newProject= await projectService.createProject({name, userId})

        res.status(200).json(newProject)

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
}

export const getAllProjects=async (req,res)=>{
    const errors= validationResult(req)

    try {
        
        const loggedInUser= await userModel.findOne({email:req.user.email})
        const allUserProjects= await projectService.getAllProjectByUserId({userId: loggedInUser._id})

        res.status(200).json(allUserProjects)

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
}

export const addUserToProject=async (req,res)=>{
    const errors= validationResult(req)

    try {
        
        const {projectId, users}= req.body

        const loggedInUser= await userModel.findOne({
            email:req.body.email
        })

        const project= await projectService.addUserToProject({
            projectId, users, users:loggedInUser._id
        })

        res.status(200).json(project )

    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
}
