import {Router} from 'express'
import * as userController from '../controllers/user.controllers.js'
import * as authMiddleware from '../middleware/authMiddleware.js'
import {body} from 'express-validator'

const router=Router()

router.post('/register', 
body('email').isEmail().withMessage("Email must be requied"),
body('password').isLength({min:3}).withMessage("Password must be 6 character long"),
userController.createUserController)

router.post('/login', 
body('email').isEmail().withMessage("Email must be requied"),
body('password').isLength({min:3}).withMessage("Password must be 6 character long"),
userController.userLoginController)


router.get ('/profile', authMiddleware.authUser, userController.profileController)
router.get ('/logout', authMiddleware.authUser, userController.logoutController)

export default router
