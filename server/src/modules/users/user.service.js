import { hash, compare } from "bcrypt";
import userModel from "./models/user.model.js";
import reviewModel from "../review/model/review.model.js";
import borrowingModel from "../borrowing/model/borrowing.model.js";
import { isValidObjectId } from "mongoose";
import { BaseException } from "../../../exceptions/base.exception.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET } from "../../config/jwt.config.js";
import bookModel from "../books/models/book.model.js";
import { PORT } from "../../config/app.config.js";
import { sendMail } from "../../../utils/email.utils.js";
import crypto, { randomBytes } from "crypto";


class UserService {
  #_userModel;
  #_reviewModel;
  #_bookModel;
  #_borrowingModel;
  constructor() {
    this.#_userModel = userModel;
    this.#_reviewModel = reviewModel;
    this.#_bookModel = bookModel;
    this.#_borrowingModel = borrowingModel;
  }

  getAllUsers = async () => {
    const users = await this.#_userModel.find().populate("reviews").populate({
      path: "borrowings",
      populate: {
        path: "bookId",
        model: "Book",
      },
    });

    if (!users) {
      throw new BaseException("Users not found", 404);
    }
    return {
      message: "success",
      count: users.length,
      data: users,
    };
  };

  getUserById = async (id) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid user id", 400);
    }
    const user = await this.#_userModel.findById(id).populate("reviews").populate({
      path: "borrowings",
      populate: {
        path: "bookId",
        model: "Book",
      },
    });
    if (!user) {
      throw new BaseException("User not found", 404);
    }
    return {
      message: "success",
      data: user,
    };
  };

  registerUser = async ({ fullname, email, password,phoneNumber,role,age }) => {
    const existingUser = await this.#_userModel.findOne({ email });
    if (existingUser) {
      throw new BaseException("User already exists", 400);
    }
    const hashedPassword = await hash(password, 10);

    const newUser = await this.#_userModel.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      age,
    });
    const htmlContent = `
      <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background: #f9f9f9; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="text-align: center;">
          <h2 style="color: #333;">👋 Salom, ${fullname}!</h2>
          <p style="font-size: 16px; color: #555;">
            You registered successfully for <strong>Library</strong>
          </p>
        </div>
        <div style="margin: 30px 0;">
          <p style="font-size: 15px; color: #444;">
            now, you can login to your account using the following credentials:
          </p>
        </div>
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="http://localhost:${PORT}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px;">
            Passing to E-library
          </a>
        </div>
        <div style="font-size: 13px; color: #888; text-align: center;">
          <p>If this email has reached you in error, please ignore it.</p>
          <p>&copy; Online Library</p>
        </div>
      </div>
    `;
    await sendMail({
      to: email,
      subject: "Welcome!",
      html: htmlContent,
    });

    const accessToken = jwt.sign(
      {id: newUser.id, role: newUser.role},
      ACCESS_TOKEN_SECRET,
      {expiresIn: ACCESS_TOKEN_EXPIRES_IN,algorithm: "HS256"}
    );
    
    
    const refreshToken = jwt.sign(
      {id: newUser.id, role: newUser.role},
      REFRESH_TOKEN_SECRET,
      {expiresIn: REFRESH_TOKEN_EXPIRES_IN,algorithm: "HS256"}
    );
    newUser.tokens = {accessToken, refreshToken};
    await newUser.save();
    return {
      message: "success",
      data: newUser,
    };
  };

  loginUser = async ({ email, password }) => {
    const user = await this.#_userModel.findOne({ email });
    if (!user) {
      throw new BaseException("User not found", 404);
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new BaseException("Invalid password", 401);
    };
    const accessToken = jwt.sign(
      {id: user.id, role: user.role},
      ACCESS_TOKEN_SECRET,
      {expiresIn: ACCESS_TOKEN_EXPIRES_IN,algorithm: "HS256"}
    );
    const refreshToken = jwt.sign(
      {id: user.id, role: user.role},
      REFRESH_TOKEN_SECRET,
      {expiresIn: REFRESH_TOKEN_EXPIRES_IN,algorithm: "HS256"}
    );
    user.tokens = { accessToken, refreshToken };
    await user.save();

    return {
      message: "success",
      data: user,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  };
  addUserReview = async ({userId,bookId,rating,comment}) => {
    if (!isValidObjectId(userId) || !isValidObjectId(bookId)) {
      throw new BaseException("Invalid user id", 400);
    };

    const review = await this.#_reviewModel.create({
      userId,
      bookId,
      rating,
      comment,
    });

    await this.#_userModel.findByIdAndUpdate(
      userId,
      { $push: { reviews: review._id } },
      { new: true }
    );
    return {
      message: "success",
      data: review,
    }
  };

  getUserReviews = async (userId) => {
    if (!isValidObjectId(userId)) {
      throw new BaseException("Invalid user id", 400);
    };

    const user = await this.#_userModel.findById(userId).populate({
      path: "reviews",
      populate: {
        path: "bookId",
        model: "Book",
      },
    });
    if (!user) {
      throw new BaseException("User not found", 404);
    }
    return {
      message: "success",
      data: user.reviews,
      count: user.reviews.length,
    };
  }

  updateUser = async (id, { fullname, email, password,phoneNumber,role,age }) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid user id", 400);
    }

    const hashedPassword = await hash(password, 10);

    const updatedUser = await this.#_userModel.findByIdAndUpdate(
      id,
      {
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
        age,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new BaseException("User not found", 404);
    }

    return {
      message: "success",
      data: updatedUser,
    };
  };

  deleteUser = async (id) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid user id", 400);
    }
  
    const user = await this.#_userModel.findById(id);
    if (!user) {
      throw new BaseException("User not found", 404);
    }
  
    const userReviews = await reviewModel.find({ userId: id });
  
    for (const review of userReviews) {
      await this.#_bookModel.findByIdAndUpdate(review.bookId, {
        $pull: { reviews: review._id },
      });
    }
  
    await reviewModel.deleteMany({ userId: id });
  
    await this.#_userModel.findByIdAndDelete(id);
  
    return {
      message: "User and related reviews deleted successfully",
    };
  };
  forgotPassword = async (email) => {
    const user = await this.#_userModel.findOne({ email });
    if (!user) {
      throw new BaseException("User not found", 404);
  }
  const serverUrl = `http://localhost:${PORT}`;
  const token = crypto.randomBytes(25);
  user.token = token.toString("hex");
  await user.save();

  await sendMail({
    to: email,
    subject: "Password Reset",
    html: ` <h2>Click Button</h2>
        <a href="${serverUrl}/api/users/reset-password?token=${user.token}" style="background-color: green; color: white; padding:20px;border-radius:6px;">Reset Password</a>`
  });
  return {
    message: "success",
    data: user,
  };
};
resetPassword = async (token, password) => {
  
  
  if (typeof token !== "string") {
      throw new BaseException("Token must be a string", 400);
  }

  const user = await this.#_userModel.findOne({ token });
  if (!user) {
    throw new BaseException("Invalid token", 400);
  }

  const hashedPassword = await hash(password, 10);

  user.password = hashedPassword;
  user.token = null;

  await user.save();

  return {
    message: "success",
    data: user,
  };
};

}

export default new UserService();
