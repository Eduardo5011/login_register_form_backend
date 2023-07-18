require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require('./middleware/credentials');
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(credentials);

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use("/", require("./routes/authRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
