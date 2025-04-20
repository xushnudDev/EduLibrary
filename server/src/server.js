import app from "./app.js";
import { PORT } from "./config/app.config.js";
import connectDB from "./config/mongo.config.js";


await connectDB();

let server = app.listen(PORT, () => {
  console.log(`Server is running : http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason,promise) => {
  console.log(reason,"server is not running",promise);
  server.closeAllConnections();
  server.close(() => {
      process.exit(1)
  })
});


process.on("uncaughtException", (error) => {
  console.log(error,"uncaughtException is happening");
  process.exit(1)
});