const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

//rest objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// env config filed
dotenv.config();

// database called
connectDB();

//routes
app.get("/", (req, res) => {
  res.send(`<h1>Expense Tracker</h1>`);
});

const PORT = 8080 || process.env.PORT;

//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
