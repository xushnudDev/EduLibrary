import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    genre: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    publishedYear: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
    reviews: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Review",
        }
    ],
    averageRating: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    reviewsCount: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
},{
    collection: "books",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Book", bookSchema);