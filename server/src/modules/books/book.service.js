import bookModel from "./models/book.model.js";
import { isValidObjectId } from "mongoose";
import categoryModel from "../category/model/category.model.js";

class BookService {
  #_bookModel;
  #_categoryModel;
  constructor() {
    this.#_bookModel = bookModel;
    this.#_categoryModel = categoryModel;
  };
  getAllBooks = async () => {
    const books = await this.#_bookModel.find();
    if (!books) {
      throw new Error("Books not found");
    }
    return {
      message: "success",
      count: books.length,
      data: books,
    };
  };
  getBookById = async (id) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid book id");
    }
    const book = await this.#_bookModel.findById(id).populate("category");
    if (!book) {
      throw new Error("Book not found");
    }
    return {
      message: "success",
      data: book,
    };
  };
  createBook = async ({title,author,genre,publishedYear,description,category}) => {
    const existingBook = await this.#_bookModel.findOne({ title });
    if (existingBook) {
      throw new Error("Book already exists");
    }
    const newBook = await this.#_bookModel.create({
      title,
      author,
      genre,
      publishedYear,
      description,
      category,
    });
    await this.#_categoryModel.findByIdAndUpdate(category, { $push: { books: newBook._id } });
    return {
      message: "success",
      data: newBook,
    };
  };
  updateBook = async (id, { title, author, genre, publishedYear, description, category }) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid book id");
    }
    const updatedBook = await this.#_bookModel.findByIdAndUpdate(
      id,
      { title, author, genre, publishedYear, description, category },
      { new: true }
    );
    if (!updatedBook) {
      throw new Error("Book not found");
    }
    return {
      message: "success",
      data: updatedBook,
    };
  };
  deleteBook = async (id) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid book id");
    }
    const book = await this.#_bookModel.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    await this.#_bookModel.findByIdAndDelete(id);
    return {
        message: "success",
        data: book,
    };
    };
};

export default new BookService();