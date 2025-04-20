import bookService from "./book.service.js";

class BookController {
    getAllBooks = async (req,res,next) => {
        try {
            const books = await bookService.getAllBooks(req.query);
            res.status(200).send({
                data: books,
            });
        } catch (error) {
            next(error);
        }
    };
    getBookById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            res.status(200).send({
                data: book,
            });
        } catch (error) {
            next(error);
        }
    };
    createBook = async (req, res, next) => {
        try {
            const {title,author,genre,publishedYear,description,quantity,category} = req.body;
            const imageUrl = req.file ? "/uploads/" + req.file.filename : null;
            const book = await bookService.createBook({
                title,author,genre,publishedYear,imageUrl,description,quantity,category
            });
            res.status(201).send({
                data: book,
            });
        } catch (error) {
            next(error);
        }
    };
    updateBook = async (req, res, next) => {
        try {
            const { id } = req.params;
    
            const updatedData = {
                ...req.body,
            };
    
            if (req.file) {
                updatedData.imageUrl = "/uploads/" + req.file.filename;
            }
    
            const book = await bookService.updateBook(id, updatedData);
    
            res.status(200).send({
                data: book,
            });
        } catch (error) {
            next(error);
        }
    };
    
    deleteBook = async (req,res,next) => {
        try {
            const {id} = req.params;
            await bookService.deleteBook(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
};

export default new BookController();