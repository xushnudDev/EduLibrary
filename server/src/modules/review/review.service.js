import reviewModel from "./model/review.model.js";


class ReviewService {
    #_reviewModel;
    constructor() {
        this.#_reviewModel = reviewModel;
    };
}