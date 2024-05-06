import React, { useEffect, useState } from "react";
import TodoForm from "../components/form/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, openPopup } from "../redux/slice/PopupSlice";
import { IoMdClose } from "react-icons/io";
import Todos from "../components/Todos/Todos";
import { CiLock } from "react-icons/ci";

const TodoPage = () => {
  const isOpen = useSelector((state) => state.popup.isOpen);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);

  const dispatch = useDispatch();

  return (
    <>
      {/* Popup add todo form */}
      <div
        className={isOpen ? "w-[60%] max-md:w-[90%] fixed bg-white" : "hidden"}
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
        {isLoggedIn && (
          <button
            className="rounded-full h-[60px] w-[60px] border text-3xl bg-purple-700 text-white fixed bottom-8 right-8"
            onClick={() => {
              dispatch(openPopup());
            }}>
            +
          </button>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="h-full flex flex-col gap-4 justify-center items-center">
          <span className="text-6xl text-gray-800">
            <CiLock />
          </span>
          <h3 className="text-4xl text-center text-gray-800 max-sm:text-3xl">
            Please Login <br /> to see your Todos
          </h3>
        </div>
      ) : (
        <Todos />
      )}
    </>
  );
};

export default TodoPage;
