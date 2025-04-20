import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    genre: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    publishedYear: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
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
    
},{
    collection: "books",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Book", bookSchema);