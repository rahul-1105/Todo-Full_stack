import React, { useState } from "react";
import { changeFormType } from "../../redux/slice/ModalSlice";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const finalData = formData;
    if (finalData.password !== finalData.confirmPassword) {
      toast.error("Password and Confirm Password do not match", {
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
      return;
    }
    if (finalData.password.length < 8) {
      toast.warn("Password length should be atleast 8. ", {
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
      return;
    }

    setLoading(true);
    const res = await axios.post("https://vidrohi-todo-api.vercel.app/api/v1/users/signup", finalData);
    // console.log(res.data);
    const success = res.data.success;
    if (success) {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(changeFormType("login"));
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

    // console.log(finalData);
    
  };

  return (
    <>
      <form className="w-full flex flex-col gap-6" onSubmit={submitHandler}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-[12px] font-medium">
              First Name <span className="text-sm text-[red] ">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
              placeholder="First Name"
              onChange={changeHandler}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-[12px] font-medium">
              Last Name <span className="text-sm text-[red] ">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
              placeholder="Last Name"
              onChange={changeHandler}
              required
            />
          </div>
        </div>

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

        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[12px] font-medium">
              Password <span className="text-sm text-[red] ">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
                placeholder="Enter Password"
                onChange={changeHandler}
                required
              />
              <span
                className="absolute top-[50%] translate-y-[-50%] right-2 text-xl text-neutral-900 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-[12px] font-medium">
              Confirm Password <span className="text-sm text-[red] ">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                className="border border-neutral-500 rounded px-2 py-3 text-sm outline-none placeholder:text-sm placeholder:font-normal"
                placeholder="Enter Password"
                onChange={changeHandler}
                required
              />
              <span
                className="absolute top-[50%] translate-y-[-50%] right-2 text-xl text-neutral-900 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </span>
            </div>
          </div>
        </div>

        <button className={loading ? "px-2 py-3 bg-purple-700 rounded text-white cursor-wait": "px-2 py-3 bg-purple-700 rounded text-white "}>
          Register
        </button>

        <div className="text-sm flex gap-2 items-center ">
          <p>Already have an account? </p>{" "}
          <button
            type="button"
            className="font-medium"
            onClick={() => {
              dispatch(changeFormType("login"));
            }}>
            Login
          </button>
        </div>
        {/* <Button name="Login"  /> */}
      </form>
    </>
  );
};

export default SignupForm;
