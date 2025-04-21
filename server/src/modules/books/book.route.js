import { Router } from "express";
import { createBookSchema,updateBookSchema,deleteBookSchema } from "./dtos/book.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import bookController from "./book.controller.js";
import upload from "../../../utils/upload.utils.js";
import { ProtectedMiddleware } from "../../../middleware/protected.middleware.js";
import { RolesMiddleware } from "../../../middleware/roles.middleware.js";
import { ROLES } from "../../constants/role.constant.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.post("/",ProtectedMiddleware(true),RolesMiddleware(ROLES.ALL),upload.single("imageUrl"), ValidationMiddleware(createBookSchema), bookController.createBook);
bookRouter.put("/:id", ValidationMiddleware(updateBookSchema),upload.single("imageUrl"),bookController.updateBook);
bookRouter.delete("/:id",ProtectedMiddleware(true),RolesMiddleware(ROLES.ADMIN),bookController.deleteBook);

export default bookRouter;