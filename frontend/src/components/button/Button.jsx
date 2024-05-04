import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slice/ModalSlice";
import { logout } from "../../redux/slice/AuthSlice";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { emptyTodos } from "../../redux/slice/TodosSlice";

const Button = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <button
      className="py-3 px-6 bg-purple-700 text-white rounded-md "
      onClick={() => {
        if (name === "Logout") {
          return (
            sessionStorage.removeItem("userId"),
            toast.success("Logout Successfully", {
              position: "bottom-left",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }),
            dispatch(logout()),
            dispatch(emptyTodos()),
            navigate("/")
          );
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
