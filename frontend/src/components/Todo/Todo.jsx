import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../../redux/slice/TodosSlice";
import { openPopup } from "../../redux/slice/PopupSlice";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const Todo = ({ todo, todoId }) => {
  const dispatch = useDispatch();

  // console.log(id);
  return (
    <div className="h-[280px] p-4 grid grid-rows-[auto_1fr_auto] gap-4 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] rounded-lg">
      <h4 className="text-3xl">{todo.title}</h4>
      <div className="overflow-y-scroll scroll-smooth text-[15px] tracking-wide">
        {todo.description}
      </div>
      <div className="flex gap-4">
        <button
          className="py-2 px-4 bg-yellow-400 text-white rounded-md "
          onClick={() => dispatch(openPopup(todoId))}>
          Update
        </button>
        <button
          className="py-2 px-4 bg-red-600 text-white rounded-md "
          onClick={async () => {
            const res = await axios.delete(
              `http://localhost:5000/api/v1/todos/delete-todo/${todoId}`,
              {
                data: {
                  userId: sessionStorage.getItem("userId"),
                },
              }
            );
            // console.log(res.data);
            toast.success(res.data.message, {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              });
            dispatch(removeTodo(todoId));
          }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
