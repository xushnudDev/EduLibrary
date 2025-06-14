import bookModel from "./models/book.model.js";
import { isValidObjectId } from "mongoose";
import categoryModel from "../category/model/category.model.js";
import { BaseException } from "../../../exceptions/base.exception.js";
import { prohibitedGenres } from "../../constants/prohibited.genres.js";
import logger from "../../config/winston.config.js";
import { prohibitedTitles } from "../../constants/prohibited.titles.js";

class BookService {
  #_bookModel;
  #_categoryModel;
  constructor() {
    this.#_bookModel = bookModel;
    this.#_categoryModel = categoryModel;
  };
  getAllBooks = async (query) => {

    let {limit = 10,page = 1,sortField='created_at',sortOrder='asc',title,author,genre,publishedYear,quantity,category} = query;

    if (Array.isArray(limit) || Array.isArray(page)) {
      throw new BaseException("Limit must be array", 400);
    };
    limit = Number(limit) || 10;
    page = Number(page) || 1;

    if (!Number.isInteger(limit) || !Number.isInteger(page) || limit <= 0 || page <= 0) {
      throw new BaseException('Limit and page must be positive integers',400);
    };

    const sortFieldArr = ["title","author","genre","publishedYear","quantity","category","created_at"];
    const sortOrderArr = ["asc","desc"];
    if (!sortFieldArr.includes(sortField)) sortField = 'created_at';
    if (!sortOrderArr.includes(sortOrder)) sortOrder = 'asc';

    let filter = {};

    if (title) filter.title = { $regex: new RegExp(title, "i") };
    if (author) filter.author = { $regex: new RegExp(author, "i") };
    if (genre) filter.genre = { $regex: new RegExp(genre, "i") };
    if (publishedYear) filter.publishedYear = publishedYear;
    if (quantity) filter.quantity = quantity;
    if (category) filter.category = { $regex: new RegExp(category, "i") };

    const books = await this.#_bookModel.find(filter).populate("category").sort({ [sortField]: sortOrder }).skip((page - 1) * limit).limit(limit);
    const totalBooks = await this.#_bookModel.countDocuments(filter);

    return {
      message: "success",
      data: books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      limit,
    };
  };
  getBookById = async (id) => {
    if (!isValidObjectId(id)) {
      logger.error("Invalid book id");
      throw new BaseException("Invalid book id");
    }
    const book = await this.#_bookModel.findById(id).populate("category");
    if (!book) {
      logger.error("Book not found");
      throw new BaseException("Book not found");
    }
    return {
      message: "success",
      data: book,
    };
  };
  createBook = async ({title,author,genre,publishedYear,imageUrl,description,quantity,category}) => {
    const existingBook = await this.#_bookModel.findOne({ title });
    if (existingBook) {
      logger.error("Book already exists");
      throw new BaseException("Book already exists");
    }


    if (prohibitedTitles.some(word => title.toLowerCase().includes(word))) {
      logger.error("Title is prohibited");
      throw new BaseException("Title is prohibited", 400);
    };

    if (prohibitedGenres.some(word => genre.toLowerCase().includes(word))) {
      logger.error("Genre is prohibited");
      throw new BaseException("Genre is prohibited", 400);
    }
    
    
    
    const newBook = await this.#_bookModel.create({
      title,
      author,
      genre,
      publishedYear: Number(publishedYear),
      imageUrl,
      description,
      quantity: Number(quantity),
      category,
    });
    await this.#_categoryModel.findByIdAndUpdate(category, { $push: { books: newBook._id } });
    return {
      message: "success",
      data: newBook,
    };
  };
  updateBook = async (id, { title, author, genre, publishedYear,imageUrl,description,quantity,category }) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid book id");
    }
    const updatedBook = await this.#_bookModel.findByIdAndUpdate(
      id,
      { title, author, genre, publishedYear,imageUrl,description, quantity,category },
      { new: true }
    );
    if (!updatedBook) {
      logger.error("Book not found");
      throw new BaseException("Book not found");
    }
    return {
      message: "success",
      data: updatedBook,
    };
  };
  deleteBook = async (id) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Invalid book id");
    }
    const book = await this.#_bookModel.findById(id);
    if (!book) {
      throw new BaseException("Book not found");
    }
    await this.#_bookModel.findByIdAndDelete(id);
    return {
        message: "success",
        data: book,
    };
    };
};

export default new BookService();