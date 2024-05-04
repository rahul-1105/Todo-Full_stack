import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controller/todo.controller.js";

const routes = Router();

routes.post("/create-todo/:id", createTodo);
routes.put("/update-todo/:id", updateTodo);
routes.delete("/delete-todo/:id", deleteTodo);
routes.get("/get-todos/:id", getTodos);


export default routes;