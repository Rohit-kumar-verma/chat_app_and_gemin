import projectModel from "../models/project.model.js";

export const createProject= async ({name, userId})=>{
    if(!name){
        throw new Error('Name is required')
    }
    if(!userId){
        throw new Error('User is required')
    }

    try {
        const project = await projectModel.create({
            name,
            users: [userId]
        });
        console.log("Project created successfully:", project);
    } catch (error) {
        if (error.code === 11000) {
            console.error("Error: Project name must be unique.");
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
    

    return project
}