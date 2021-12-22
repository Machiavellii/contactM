const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const morgan = require("morgan");
const cors = require("cors");
require("colors");
const connectDB = require("./config/db");

//Load env vars
dotenv.config();

connectDB();

const app = express();

app.use(express());

// Routes
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS
app.use(cors());

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/contacts", contacts);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
