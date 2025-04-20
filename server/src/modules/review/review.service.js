import reviewModel from "./model/review.model.js";
import { isValidObjectId } from "mongoose";
import userModel from "../users/models/user.model.js";
import { BaseException } from "../../../exceptions/base.exception.js";
import bookModel from "../books/models/book.model.js";


class ReviewService {
    #_reviewModel;
    #_bookModel;
    #_userModel;
    constructor() {
        this.#_reviewModel = reviewModel;
        this.#_bookModel = bookModel;
        this.#_userModel = userModel;
    };
    addReview = async ({ userId, bookId, rating, comment }) => {
        if (!isValidObjectId(userId) || !isValidObjectId(bookId)) {
            throw new BaseException(400, "Invalid userId or bookId");
        }

        
        const review = await this.#_reviewModel.create({
            userId,
            bookId,
            rating,
            comment,
        });

        await this.#_bookModel.findByIdAndUpdate(bookId, {
            $push: { reviews: review._id },
        });
        await this.#_userModel.findByIdAndUpdate(userId, {
            $push: { reviews: review._id },
        });

        return {
            message: "Review added successfully",
            review,
        };
    };

    getReviews = async () => {
        const reviews = await this.#_reviewModel.find();
        return {
            message: "Reviews fetched successfully",
            count: reviews.length,
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
        }

        const review = await this.#_reviewModel.findById(reviewId);

        if (!review) {
            throw new BaseException(404, "Review not found");
        }

        await this.#_reviewModel.findByIdAndDelete(reviewId);

        await this.#_userModel.findByIdAndUpdate(review.userId, {
            $pull: { reviews: reviewId },
        });

        await this.#_bookModel.findByIdAndUpdate(review.bookId, {
            $pull: { reviews: reviewId },
        });

        return {
            message: "Review deleted successfully",
        };
    };
};
export default new ReviewService();
