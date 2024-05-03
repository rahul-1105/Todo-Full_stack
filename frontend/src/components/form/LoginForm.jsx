import React, { useState } from "react";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { changeFormType } from "../../redux/slice/ModalSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

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

  const submitHandler = (e) => {
    e.preventDefault();
    const finalData = formData;
    if (finalData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    console.log(finalData);
    setFormData({
      email: "",
      password: "",
    });
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

        <button className="px-2 py-3 bg-purple-700 rounded text-white ">
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
