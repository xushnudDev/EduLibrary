import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema({
    userId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    bookId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Book",
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