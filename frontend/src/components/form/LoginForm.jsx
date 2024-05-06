import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFormType, closeModal } from "../../redux/slice/ModalSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slice/AuthSlice";
import { Bounce, toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(e.taget.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const finalData = formData;
    // if (finalData.password.length < 8) {
    //   toast.error("Password must be at least 8 characters long", {
    //     position: "bottom-left",
    //     autoClose: 1500,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     transition: Bounce,
    //     });
    //   return;
    // }

    setLoading(true);
    const res = await axios.post(
      "https://vidrohi-todo-api.vercel.app/api/v1/users/login",
      finalData
    );
    // console.log(res.data);
    const success = res.data.success;
    if (success) {
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
      dispatch(closeModal());
      dispatch(login());
      const userId = res.data.data._id;
      sessionStorage.setItem("userId", userId);
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
      navigate("/todos");
    } else {
      setLoading(false);
      toast.error(res.data.message, {
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
    }
  };

  return (
    <>
      <form className="w-full flex flex-col gap-6" onSubmit={submitHandler}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-[12px] font-medium">
            Email Address <span className="text-sm text-[red] ">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
            placeholder="Enter Email"
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-[12px] font-medium">
            Password <span className="text-sm text-[red] ">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
            placeholder="Enter Password"
            onChange={changeHandler}
            required
          />
        </div>

        <button
          className={
            loading
              ? "px-2 py-3 bg-purple-700 rounded text-white cursor-wait"
              : "px-2 py-3 bg-purple-700 rounded text-white "
          }>
          Login
        </button>

        <div className="text-sm flex gap-2">
          <p>Don't have an account? </p>{" "}
          <button
            type="button"
            className="font-medium"
            onClick={() => {
              dispatch(changeFormType("signup"));
            }}>
            Register
          </button>
        </div>
        {/* <Button name="Login"  /> */}
      </form>
    </>
  );
};

export default LoginForm;
