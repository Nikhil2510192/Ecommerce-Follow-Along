import {Router} from "express"
import createUser from "../Controllers/userController.js"
import loginUser from "../Controllers/loginController.js"

 const router = Router()

router.route("/create").post(createUser)
router.route("/login").post(loginUser)


export {router}