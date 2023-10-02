const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
// const router = require("./routes/userRoute");

// env config filed
dotenv.config();

// database called
connectDB();

//rest objects
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
// app.use('/api/v1/users',router)
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

const PORT = 8080 || process.env.PORT;

//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
