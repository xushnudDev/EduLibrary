import {Router} from "express";
import userController from "./user.controller.js";
import {registerSchema,loginSchema,deleteUserSchema,addUserReviewSchema} from "./dtos/user.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import { RolesMiddleware } from "../../../middleware/roles.middleware.js";
import { ROLES } from "../../constants/role.constant.js";
import {ProtectedMiddleware} from "../../../middleware/protected.middleware.js";

const userRouter = Router();

userRouter.post("/register",ProtectedMiddleware(false),ValidationMiddleware(registerSchema),RolesMiddleware(ROLES.ALL), userController.registerUser);
userRouter.post("/login", ProtectedMiddleware(false),ValidationMiddleware(loginSchema),RolesMiddleware(ROLES.ALL),userController.loginUser);
userRouter.get("/",ProtectedMiddleware(false),userController.getAllUsers);
userRouter.get("/:id",userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN),ValidationMiddleware(deleteUserSchema),userController.deleteUser);
userRouter.post("/forgot-password",userController.forgotPassword);
userRouter.post("/reset-password",userController.resetPassword);


userRouter.post('/review',ValidationMiddleware(addUserReviewSchema),userController.addUserReview);
userRouter.get('/review/:id',userController.getUserReviews);

export default userRouter;