import mongoose from "mongoose";
import { ROLES } from "../../../constants/role.constant.js";


const userSchema = new mongoose.Schema({
    fullname: {
        type:mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type:mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim
    },
    password: {
        type:mongoose.SchemaTypes.String,
        required: true,
    },
    phoneNumber: {
        type:mongoose.SchemaTypes.String,
        required: true,
    },
    role: {
        type:mongoose.SchemaTypes.String,
        enum: [ROLES.ADMIN, ROLES.USER],
        default: ROLES.USER,
    },
    age: {
        type:mongoose.SchemaTypes.Number,
        required: true,
    },
    reviews: [
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref: "Review",
        }
    ],
    borrowings: [
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref: "Borrowing",
        }
    ],
    tokens: {
        accessToken: {
            type:mongoose.SchemaTypes.String,
        },
        refreshToken: {
            type:mongoose.SchemaTypes.String,
        },
    },
    token: {
        type:mongoose.SchemaTypes.String,
        required: false,
    }
},{
    collection:"users",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model('User', userSchema);