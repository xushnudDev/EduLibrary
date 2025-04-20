import bookModel from "../books/models/book.model.js";
import borrowingModel from "./model/borrowing.model.js";
import userModel from "../users/models/user.model.js";


class BorrowingService {
    #_borrowingModel;
    #_bookModel;
    #_userModel;
    constructor() {
        this.#_borrowingModel = borrowingModel;
        this.#_bookModel = bookModel;
        this.#_userModel = userModel;
    };
    borrowBooks = async ({userId,bookId,borrowDate,returnDate}) => {
        const user = await this.#_userModel.findById(userId);
        if(!user) {
            throw new Error("User not found");
        }
        const book = await this.#_bookModel.findById(bookId);
        if(!book) {
            throw new Error("Book not found");
        }
        if(book.quantity === 0) {
            throw new Error("Book is not available");
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
            $push: {borrowings: borrowing._id},
        });
        return {
            message: "Book borrowed successfully",
            data: borrowing,
        };
    }
    returnBook = async ({userId,bookId}) => {
        const borrowing = await this.#_borrowingModel.findOneAndDelete({
            user: userId,
            book: bookId,
        });
    }
};
