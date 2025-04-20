import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema({
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Book",
        required: true,
    },
    borrowDate: {
        type:mongoose.SchemaTypes.String,
        required: true,
    },
    returnDate: {
        type:mongoose.SchemaTypes.String,
        required: true,
    }
},{
    collection: "borrowings",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Borrowing", borrowingSchema);