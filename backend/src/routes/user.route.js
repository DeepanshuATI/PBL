import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, deleteUser ,changeCurrentPassword ,logoutUser} from '../controllers/user.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from '../utils/asyncHandler.js';



const router = Router();


    router.route("/register").post( registerUser);
    router.route("/login").post(loginUser);
    router.route("/change-password").post(verifyJWT, changeCurrentPassword);
    router.route("/current-user").get(verifyJWT, asyncHandler(getCurrentUser));
    router.delete("/delete-user",verifyJWT,deleteUser);
    router.route("/logout").post(verifyJWT,logoutUser);



export default router;
