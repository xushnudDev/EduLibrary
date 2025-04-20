import borrowingController from "./borrowing.controller.js";
import { borrowSchema,returnSchema } from "./dtos/borrowing.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import { ROLES } from "../../constants/role.constant.js";
import { RolesMiddleware } from "../../../middleware/roles.middleware.js";
import { Router } from "express";

const borrowingRouter = Router();

borrowingRouter.post("/borrow", ValidationMiddleware(borrowSchema), RolesMiddleware(ROLES.USER), borrowingController.borrowBooks);
borrowingRouter.post("/return", ValidationMiddleware(returnSchema), RolesMiddleware(ROLES.USER), borrowingController.returnBook);

export default borrowingRouter;