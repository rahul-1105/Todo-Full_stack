import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import Modal from "./components/modal/Modal";

const App = () => {
  return (
    <>
      <header className="px-12 border-[.5px] border-gray-300 ">
        <Navbar />
      </header>
      <Modal />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
