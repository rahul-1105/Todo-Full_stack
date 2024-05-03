import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slice/ModalSlice";

const Button = ({ name }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="py-2 px-4 bg-purple-700 text-white rounded "
      onClick={() => {
        if (name === "Logout") {
          return;
        }
        if (name === "Login") {
          dispatch(openModal("login"));
        } else {
          dispatch(openModal("signup"));
        }
      }}>
      {name}
    </button>
  );
};

export default Button;
