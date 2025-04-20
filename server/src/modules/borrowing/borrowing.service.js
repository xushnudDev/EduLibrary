import bookModel from "../books/models/book.model.js";
import borrowingModel from "./model/borrowing.model.js";
import userModel from "../users/models/user.model.js";
import { isValidObjectId } from "mongoose";
import { BaseException } from "../../../exceptions/base.exception.js";

class BorrowingService {
  #_borrowingModel;
  #_bookModel;
  #_userModel;

  constructor() {
    this.#_borrowingModel = borrowingModel;
    this.#_bookModel = bookModel;
    this.#_userModel = userModel;
  }

  borrowBooks = async ({ userId, bookId, borrowDate, returnDate }) => {
    if (!isValidObjectId(userId) || !isValidObjectId(bookId)) {
      throw new BaseException("Invalid ID format", 400);
    }

    const user = await this.#_userModel.findById(userId);
    if (!user) throw new BaseException("User not found", 404);

    const book = await this.#_bookModel.findById(bookId);
    if (!book) throw new BaseException("Book not found", 404);

    if (book.quantity <= 0) {
      throw new BaseException("Book is not available", 400);
    }

    const borrowing = await this.#_borrowingModel.create({
      user: userId,
      book: bookId,
      borrowDate,
      returnDate,
    });

    book.quantity--;
    await book.save();

    await this.#_userModel.findByIdAndUpdate(userId, {
      $push: { borrowings: borrowing._id },
    });

    return {
      message: "Book borrowed successfully",
      data: borrowing,
    };
  };

  returnBook = async ({ userId, bookId }) => {
    const borrowing = await this.#_borrowingModel.findOneAndDelete({
      user: userId,
      book: bookId,
    });

    if (!borrowing) {
      throw new BaseException("Borrowing record not found", 404);
    }

    const book = await this.#_bookModel.findById(bookId);
    if (book) {
      book.quantity++;
      await book.save();
    }

    await this.#_userModel.findByIdAndUpdate(userId, {
      $pull: { borrowings: borrowing._id },
    });

    return {
      message: "Book returned successfully",
    };
  };
}

export default new BorrowingService();
