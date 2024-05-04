import { get } from "mongoose";
import Todo from "../models/todo.models.js";
import User from "../models/user.models.js";

// create todo
export const createTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // check if the user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found.",
      });
    }

    // create the newTodo
    const newTodo = new Todo({
      title,
      description,
      user: id,
    });

    // save the newTodo
    const savedTodo = await newTodo.save();

    // add the todo to the user
    await User.findByIdAndUpdate(id, { $push: { todos: savedTodo._id } });

    res.status(200).json({
      success: true,
      data: savedTodo,
      message: "Todo created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};

// update todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // check if the todo exists
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Todo not found.",
      });
    }

    // update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    // save the todo
    const savedTodo = await updatedTodo.save();

    res.status(200).json({
      success: true,
      data: savedTodo,
      message: "Todo updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};

// delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(userId);
    // check if the user exists
    const existingUser = await User.findByIdAndUpdate(userId, {
      $pull: { todos: id },
    });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found.",
      });
    }
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: todo,
      message: "Todo deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};

// get all todos

export const getTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.find({ user: id });
    if (todos.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Todos",
      });
    }
    res.status(200).json({
      success: true,
      data: todos,
      message: "Todos fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};
