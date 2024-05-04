import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Todo", path: "/todos" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);


  return (
    <div className="h-[70px] flex justify-between items-center gap-4 ">
      <div className="text-4xl font-bold text-purple-800">Todo</div>
      <ul className="h-full flex gap-8 justify-between items-center text-[1.05rem] font-medium ">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className="hover:text-purple-800 duration-300 transition-all ease-in-out">
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex gap-6 justify-center items-center">
        {!isLoggedIn && <Button name="Login"/>}
        {!isLoggedIn && <Button name="Signup"/>}
        {isLoggedIn && <Button name="Logout" />}
      </div>
    </div>
  );
};

export default Navbar;
