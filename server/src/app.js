import express from 'express';
import userRouter from './modules/users/user.route.js';
import bookRouter from './modules/books/book.route.js';
import categoryRouter from './modules/category/category.route.js';
import reviewRouter from './modules/review/review.route.js';
import borrowingRouter from './modules/borrowing/borrowing.route.js';
import { ErrorHandlerMiddleware } from '../middleware/error.handling.middleware.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/category', categoryRouter);
app.use('/api/review', reviewRouter);
app.use('/api/borrowing', borrowingRouter);
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(ErrorHandlerMiddleware);




export default app;