import reviewService from "./review.service.js";


class ReviewController {
    addReview = async (req,res,next) => {
        try {
            const data = await reviewService.addReview(req.body);
            res.status(201).send(data);
        } catch (error) {
            next(error);
        }
    };
    getReviews = async (req,res,next) => {
        try {
            const {userId} = req.params;
            const data = await reviewService.getReviews(userId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    };
    updateReview = async (req,res,next) => {
        try {
            const {reviewId} = req.params;
            const data = await reviewService.updateReview(reviewId,req.body);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    };
    deleteReview = async (req,res,next) => {
        try {
            const {reviewId} = req.params;
            const data = await reviewService.deleteReview(reviewId);
            res.status(200).send(data);
        } catch (error) {
            next(error);
        }
    }
}
export default new ReviewController();