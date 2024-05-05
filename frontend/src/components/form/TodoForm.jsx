import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../redux/slice/TodosSlice";
import { closePopup } from "../../redux/slice/PopupSlice";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { setLoading } from "../../redux/slice/LoadingSlice";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const array = useSelector((state) => state.todos.todos);
  const todoId = useSelector((state) => state.popup.id);

  // console.log(todoId);

  useEffect(() => {
    if (todoId) {
      const todo = array.find((todo) => todo.id === todoId);
      setFormData({
        title: todo.title,
        description: todo.description,
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [todoId]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (todoId) {
      const updatedTodo = {
        id: todoId,
        title: formData.title,
        description: formData.description,
      };
      dispatch(setLoading(true));
      axios
        .put(
          `https://vidrohi-todo-api.vercel.app/api/v1/todos/update-todo/${todoId}`,
          {
            title: formData.title,
            description: formData.description,
            completed: false,
          }
        )
        .then((res) => {
          dispatch(updateTodo(updatedTodo));
          dispatch(setLoading(false));
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
        });
    } else {
      dispatch(setLoading(true));
      axios
        .post(
          `https://vidrohi-todo-api.vercel.app/api/v1/todos/create-todo/${sessionStorage.getItem(
            "userId"
          )}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
        .then((res) => {
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
          dispatch(
            addTodo({
              _id: res.data.data._id,
              title: res.data.data.title,
              description: res.data.data.description,
            })
          );
          dispatch(setLoading(false));
        });
    }
    setFormData({
      title: "",
      description: "",
    });
    dispatch(closePopup());
  };

  return (
    <>
      <form
        className="rounded-xl shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-4 border w-full flex flex-col gap-4 relative"
        onSubmit={submitHandler}>
        <h1 className="text-xl font-semibold ">
          {todoId ? "Update Todo" : "Add Todo"}
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium text-[15px] ">
            Title
          </label>
          <input
            type="text"
            className="border py-4 px-2 text-[15px] outline-none rounded-md"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Enter Title"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium text-[15px]">
            Description
          </label>
          <textarea
            type="text"
            className="border p-2 h-[100px] text-[15px] outline-none rounded-md"
            id="description"
            name="description"
            value={formData.description}
            placeholder="Enter Title"
            onChange={changeHandler}
            required></textarea>
        </div>

        <button
          className={
            todoId
              ? "py-3 px-8 rounded bg-yellow-400 text-white self-start"
              : "py-3 px-8 rounded bg-purple-700 text-white self-start"
          }>
          {todoId ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
