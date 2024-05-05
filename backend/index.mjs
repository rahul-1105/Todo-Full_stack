import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.mjs";
import userRoutes from "./routes/user.routes.mjs";
import todoRoutes from "./routes/todo.routes.mjs";
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

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

connectDB();
//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// connect to database
