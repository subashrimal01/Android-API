const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan")
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const publicDir = path.join(__dirname,"uploads");
const colors = require("colors");
const errorHandler = require("./middleware/customizederror");

dotenv.config({
    path: "./config/config.env",
});

// Connect to mongoDB database
connectDB();

// Load routes files
const auth = require("./routes/auth");
const student = require("./routes/student");
const wishlist = require("./routes/wishlist");
const enrollment = require("./routes/enrollment");
const content = require("./routes/content");
const { urlencoded } = require("express");

// initialize out app variable with express
const app = express();

//Body parser , which allows to receive body data from postman
app.use(express.json());
app.use(express.urlencoded({urlencoded:true}))
app.use(cookieParser());

// i want this only to run during development process not in production mode
if (process.env.NODE_ENV.trim() === "development") {
    app.use(morgan("dev"));
}

//File upload
app.use(fileupload());


// Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/student", student);
app.use("/api/v1", wishlist);
app.use("/api/v1", enrollment);
app.use("/api/v1", content);
// To use the custom error message
app.use(errorHandler);
app.use(express.static(publicDir));

const PORT = process.env.PORT || 5000;

// In order to run the server we need to call listen
const server = app.listen(
    PORT,
    console.log(
      `Server running in mode : ${process.env.NODE_ENV},on port : ${PORT}`.yellow
        .bold
    )
  );

  //Handle unhandled promise rejections , change the password in the env file and check it will throw error message. it may take some time
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error connecting database : ${err.message}`.red);
    //close server and exit process
    server.close(() => process.exit(1));
  });
  