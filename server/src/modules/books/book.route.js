import { Router } from "express";
import { createBookSchema,updateBookSchema } from "./dtos/book.schema.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import bookController from "./book.controller.js";
import upload from "../../../utils/upload.utils.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.post("/", upload.single("imageUrl"), ValidationMiddleware(createBookSchema), bookController.createBook);
bookRouter.put("/:id", ValidationMiddleware(updateBookSchema),upload.single("imageUrl"),bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;  