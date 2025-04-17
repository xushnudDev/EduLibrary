import express from 'express';
import userRouter from './modules/users/user.route.js';
import bookRouter from './modules/books/book.route.js';
import categoryRouter from './modules/category/category.route.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/category', categoryRouter);


export default app;