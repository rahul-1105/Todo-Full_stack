import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/ModalSlice";
import { IoMdClose } from "react-icons/io";
import LoginForm from "../form/LoginForm";
import SignupForm from "../form/SignupForm";

const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  // console.log(isOpen);

  const dispatch = useDispatch();

  const formType = useSelector((state) => state.modal.formType);

  return (
    <>
      {/* Overlay */}
      <div
        className={
          !isOpen
            ? " fixed opacity-0 -z-50 duration-[.3s] transition-all"
            : "modal-overlay min-h-[calc(100vh-0px)] bg-black opacity-[.3] fixed inset-0 cursor-pointer z-50 duration-[.3s] transition-all"
        }
        onClick={() => {
          dispatch(closeModal());
        }}></div>

      {/* Pop Modal */}
      <div
        className={
          !isOpen
            ? "fixed opacity-0 -z-50 duration-[.3s] transition-all "
            : "bg-white rounded-xl overflow-hidden fixed opacity-100 z-50 duration-[.3s] transition-all"
        }
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <div className="min-h-[400px] min-w-[400px] px-6 py-12 relative flex flex-col items-center justify-center border-2">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-800"
            onClick={() => {
              dispatch(closeModal());
            }}>
            <IoMdClose />
          </button>
          <div className="mb-8">
            <h2 className="text-4xl font-semibold text-purple-800">
              {formType === "login" && "Login"}
              {formType === "signup" && "Register"}
            </h2>
          </div>
          {formType === "login" && <LoginForm />}
          {formType === "signup" && <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default Modal;
