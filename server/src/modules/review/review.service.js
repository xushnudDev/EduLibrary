import reviewModel from "./model/review.model.js";
import { isValidObjectId } from "mongoose";
import userModel from "../users/models/user.model.js";
import { BaseException } from "../../../exceptions/base.exception.js";


class ReviewService {
    #_reviewModel;
    #_userModel;
    constructor() {
        this.#_reviewModel = reviewModel;
        this.#_userModel = userModel;
    };
    addReview = async ({userId,bookId,rating,comment}) => {
        if (!isValidObjectId(userId) || !isValidObjectId(bookId)) {
            throw new BaseException(400, "Invalid userId or bookId");
        };
        const review = await this.#_reviewModel.create({
            userId,
            bookId,
            rating,
            comment,
        });
        await this.#_userModel.findByIdAndUpdate(userId, {
            $push: {
                reviews: review._id,
            },
        });
        return {
            message: "Review added successfully",
            review,
        };
    };
    getReviews = async (userId) => {
        if (!isValidObjectId(userId)) {
            throw new BaseException(400, "Invalid userId");
        };
        const reviews = await this.#_reviewModel.find({
            userId,
        }).populate("bookId");
        return {
            message: "Reviews fetched successfully",
            data:reviews,
        };
    };
    updateReview = async (reviewId, {rating,comment}) => {
        if (!isValidObjectId(reviewId)) {
            throw new BaseException(400, "Invalid reviewId");
        };
        const review = await this.#_reviewModel.findByIdAndUpdate(reviewId, {
            rating,
            comment,
        }, {
            new: true,
        });
        return {
            message: "Review updated successfully",
            review,
        };
    };
    deleteReview = async (reviewId) => {
        if (!isValidObjectId(reviewId)) {
            throw new BaseException(400, "Invalid reviewId");
        };
        await this.#_reviewModel.findByIdAndDelete(reviewId);

        await this.#_userModel.findByIdAndUpdate(review.userId, {
            $pull: {
                reviews: reviewId,
            },
        });
        return {
            message: "Review deleted successfully",
        };
    }
};
export default new ReviewService();
