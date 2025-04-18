import { Router } from "express";   
import reviewController from "./review.controller.js";
import { ValidationMiddleware } from "../../../middleware/validation.middleware.js";
import { addReviewSchema, updateReviewSchema } from "./dtos/review.schema.js";


const reviewRouter = Router();

reviewRouter.post("/", ValidationMiddleware(addReviewSchema),reviewController.addReview);
reviewRouter.get("/:id",reviewController.getReviews);
reviewRouter.put("/:id",ValidationMiddleware(updateReviewSchema),reviewController.updateReview);
reviewRouter.delete("/:id",reviewController.deleteReview);