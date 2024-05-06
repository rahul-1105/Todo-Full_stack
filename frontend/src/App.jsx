import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Modal from "./components/modal/Modal";
import { useDispatch } from "react-redux";
import { login } from "./redux/slice/AuthSlice";
import TodoPage from "./pages/TodoPage";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      dispatch(login());
    }
  })

  return (
    <>
      <header className="px-12 max-lg:px-8 max-sm:px-4 border-b-[.5px] border-gray-300 ">
        <Navbar />
      </header>
      <Modal />
      <main className="h-[calc(100vh-71px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
