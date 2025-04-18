import {Router} from "express";
import userController from "./user.controller.js";
import {registerSchema,loginSchema, addUserReviewSchema} from "./dtos/user.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import { RolesMiddleware } from "../../../middleware/roles.middleware.js";
import { ROLES } from "../../constants/role.constant.js";

const userRouter = Router();

userRouter.post("/register", ValidationMiddleware(registerSchema),RolesMiddleware(ROLES.ALL), userController.registerUser);
userRouter.post("/login", ValidationMiddleware(loginSchema),RolesMiddleware(ROLES.ALL),userController.loginUser);
userRouter.get("/",userController.getAllUsers);
userRouter.get("/:id",userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id",userController.deleteUser);


userRouter.post('/review',ValidationMiddleware(addUserReviewSchema),userController.addUserReview);
userRouter.get('/review/:id',userController.getUserReviews);

export default userRouter;