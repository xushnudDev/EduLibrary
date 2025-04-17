import { Router } from "express";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import categoryController from "./category.controller.js";
import { createCategorySchema,updateCategorySchema } from "./dtos/category.schema.js";


const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.post("/", ValidationMiddleware(createCategorySchema), categoryController.createCategory);
categoryRouter.put("/:id", ValidationMiddleware(updateCategorySchema), categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;