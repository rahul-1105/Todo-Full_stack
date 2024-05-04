import React, { useEffect, useState } from "react";
import TodoForm from "../components/form/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, openPopup } from "../redux/slice/PopupSlice";
import { IoMdClose } from "react-icons/io";
import Todos from "../components/Todos/Todos";
import axios from "axios";
import { addTodo } from "../redux/slice/TodosSlice";
import { CiLock } from "react-icons/ci";
import Loader from "../components/loader/Loader";

const TodoPage = () => {
  const isOpen = useSelector((state) => state.popup.isOpen);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(false);
  // console.log(isOpen);

  const dispatch = useDispatch();

  const getTodos = async () => {
    if (sessionStorage.getItem("userId")) {
      await axios
        .get(
          `http://localhost:5000/api/v1/todos/get-todos/${sessionStorage.getItem(
            "userId"
          )}`
        )
        .then((res) => {
          // console.log(res.data.data);
          const todos = res.data.data;
          todos.forEach((todo) => {
            dispatch(addTodo(todo));
          });
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    getTodos();
    setLoading(false);
    // console.log("useEffect");
  }, []);

  return loading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      {/* Popup add todo form */}
      <div
        className={isOpen ? "w-[60%] mx-auto my-4 fixed bg-white" : "hidden"}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <button
          className="absolute top-2 right-2 z-50 text-2xl text-gray-800 "
          onClick={() => {
            dispatch(closePopup());
          }}>
          <IoMdClose />
        </button>
        <TodoForm />
      </div>
      <div>
        {isLoggedIn &&
          (console.log("isLoggedIn", isLoggedIn),
          (
            <button
              className="rounded-full h-[60px] w-[60px] border text-3xl bg-purple-700 text-white fixed bottom-8 right-8"
              onClick={() => {
                dispatch(openPopup());
              }}>
              +
            </button>
          ))}
      </div>

      {!isLoggedIn ? (
        <div className="h-full flex flex-col gap-4 justify-center items-center">
          <span className="text-6xl text-gray-800">
            <CiLock />
          </span>
          <h1 className="text-4xl text-center text-gray-800">
            Please Login <br /> to see your Todos
          </h1>
        </div>
      ) : (
        <Todos />
      )}
    </>
    
  );
};

export default TodoPage;
