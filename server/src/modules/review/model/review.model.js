import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book",
        required: true,
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
},{
    collection: "reviews",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Review", reviewSchema);