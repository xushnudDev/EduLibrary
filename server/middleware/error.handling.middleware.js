export const ErrorHandlerMiddleware = (error,_,response,__) => {
    if (error.isException) {
      return response.status(error.statusCode).send({message:error.message});
    } else {
        console.log(error);
        return response.status(500).send({message:"Internal Server Error"});
        
    }
}