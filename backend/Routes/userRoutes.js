import {Router} from "express"
import createUser from "../Controllers/userController.js"

 const router = Router()

router.route("/create").post(createUser)


export {router}