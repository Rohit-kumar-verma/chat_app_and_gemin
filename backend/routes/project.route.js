import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from '../middleware/authMiddleware.js'


const router= Router()


router.post('/create', 
authMiddleware.authUser,
body('name').isString().withMessage('Name is required'),
projectController.createProject
)

router.get('/all', 
authMiddleware.authUser,
projectController.getAllProjects
)

router.put(
    '/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage("ProjectId must be string"),
      body('users')
        .isArray({ min: 1 }) // Ensure it's an array with at least one element
        .withMessage('Users must be array of string'),
      body('users.*')
        .isString()
        .withMessage('Each user must be a string'),
    projectController.addUserToProject
  );

export default router