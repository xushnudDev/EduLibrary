import borrowingController from "./borrowing.controller.js";
import { borrowSchema,returnSchema } from "./dtos/borrowing.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import { ROLES } from "../../constants/role.constant.js";
import { RolesMiddleware } from "../../../middleware/roles.middleware.js";
import { Router } from "express";

const borrowingRouter = Router();

borrowingRouter.post("/", ValidationMiddleware(borrowSchema), RolesMiddleware(ROLES.ALL), borrowingController.borrowBooks);
borrowingRouter.post("/return", ValidationMiddleware(returnSchema), RolesMiddleware(ROLES.ALL), borrowingController.returnBook);
borrowingRouter.get("/",borrowingController.getAllBorrowings);
borrowingRouter.patch("/:id",borrowingController.updateBorrowing);
export default borrowingRouter;