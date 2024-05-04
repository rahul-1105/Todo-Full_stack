import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// middleware to parse JSON data form the request body
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// connect to database
connectDB();
