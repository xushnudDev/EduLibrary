import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    }],
},{
    collection: "categories",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Category", categorySchema);