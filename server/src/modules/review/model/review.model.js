import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book",
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        default: 1,
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