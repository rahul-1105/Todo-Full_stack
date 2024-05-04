import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
};

const userId = sessionStorage.getItem("userId");

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload._id
      );
      if (existingTodo) {
        return;
      }
      const todo = {
        id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        // console.log("todo updated");
      }
    },
    // getTodos : async (state) => {
    //   if (userId) {
    //     const res = await axios.get(
    //       `http://localhost:5000/api/v1/todos/get-todos/${userId}`
    //     );
    //     console.log(res.data.data);
    //     const todos = res.data.data;
    //     todos.forEach((todo) => {
    //       const todo = {
    //         id: nanoid(),
    //         title: todo.title,
    //         description: todo.description,
    //       }
    //       state.todos.push(newTodo);
    //     });
    //   }
    // }
    emptyTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, removeTodo, updateTodo, emptyTodos } =
  todosSlice.actions;

export default todosSlice.reducer;
