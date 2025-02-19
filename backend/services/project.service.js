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


export const getAllProjectByUserId= async({userId})=>{
    if(!userId){
        throw new Error('User is required')
    }

    const allUserProjects= await projectModel.find({users:userId})

    return allUserProjects
}
 

export const addUserToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error("Project ID is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid Project ID");
    }
    if (!users || !Array.isArray(users) || users.length === 0) {
        throw new Error("Users must be a non-empty array");
    }
    for (const userId of users) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error(`Invalid User ID: ${userId}`);
        }
    }

    if (!userId) {
        throw new Error("User ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid User ID");
    }
    const project= await projectModel.findOne({
        _id:projectId,
        users: userId
    })

    if(!project){
        throw new Error("User is not belong to this project");
    }

    const updatedProject= await projectModel.findOneAndUpdate({
        _id:projectId
    },
    {
        $addToSet:{
            users:{
                $each:users
            }
        }
    },
    {
        new: true
    })

    return updatedProject
};
