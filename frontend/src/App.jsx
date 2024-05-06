import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Modal from "./components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slice/AuthSlice";
import TodoPage from "./pages/TodoPage";
import { setLoading } from "./redux/slice/LoadingSlice";
import axios from "axios";
import { addTodo } from "./redux/slice/TodosSlice";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      dispatch(login());
    }
  });

  const getTodos = async () => {
    if (sessionStorage.getItem("userId")) {
      dispatch(setLoading(true));
      await axios
        .get(
          `https://vidrohi-todo-api.vercel.app/api/v1/todos/get-todos/${sessionStorage.getItem(
            "userId"
          )}`
        )
        .then((res) => {
          dispatch(setLoading(false));
          // console.log(res.data.data);
          const todos = res.data.data;
          todos.forEach((todo) => {
            dispatch(addTodo(todo));
            // console.log("useEffect");
          });
        });
    }
  };

  useEffect(() => {
    getTodos();
  }, [isLoggedIn]);

  return (
    <>
      <header className="px-12 max-lg:px-8 max-sm:px-4 border-b-[.5px] border-gray-300 ">
        <Navbar />
      </header>
      <Modal />
      <main className="h-[calc(100vh-71px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
