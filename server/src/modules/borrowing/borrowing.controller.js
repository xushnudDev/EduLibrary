import borrowingService from "./borrowing.service.js";


class BorrowingController {
    borrowBooks = async (req,res,next) => {
        try {
            const {userId,bookId,borrowDate,returnDate} = req.body;
            const data = await borrowingService.borrowBooks({
                userId,bookId,borrowDate,returnDate
            });
            res.status(201).send({
                message: "success",
                data
            });
        } catch (error) {
            next(error);
        }
    };
    returnBook = async (req,res,next) => {
        try {
            const {id} = req.params;
            const data = await borrowingService.returnBooks(id);
            res.status(200).send({
                message: "success",
                data
            });
        } catch (error) {
            next(error);
        }
    }
};
export default new BorrowingController();