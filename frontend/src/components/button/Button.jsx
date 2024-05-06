import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slice/ModalSlice";
import { logout } from "../../redux/slice/AuthSlice";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { emptyTodos } from "../../redux/slice/TodosSlice";
import { closeNav } from "../../redux/slice/ToggleNavSlice";

const Button = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <button
      className="py-3 px-6 max-lg:py-2 max-lg:px-4 max-md:py-3 max-md:px-6 bg-purple-700 text-white rounded-md max-md:rounded "
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
            dispatch(closeNav()),
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
        dispatch(closeNav());
      }}>
      {name}
    </button>
  );
};

export default Button;
