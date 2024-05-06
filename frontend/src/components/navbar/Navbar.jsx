import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { closeNav, openNav } from "../../redux/slice/ToggleNavSlice";

const Navbar = () => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Todo", path: "/todos" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const toggleNav = useSelector((state) => state.toggleNav.toggleNav);
  // console.log(isLoggedIn);

  const dispatch = useDispatch();

  return (
    <div className="h-[70px] flex justify-between items-center gap-4">
      <Link to="/">
        <h1 className="text-4xl font-bold text-purple-800">Todo</h1>
      </Link>
      <button
        onClick={() => {
          dispatch(openNav("show-nav"));
        }}>
        <RxHamburgerMenu className="text-3xl md:hidden lg:hidden" />
      </button>
      <div
        className={`md:w-[69%] lg:w-[67%] xl:w-[60%] h-full flex justify-between items-center hamburger-content ${toggleNav} `}>
        <button
          className={"text-3xl md:hidden fixed top-4 right-4 z-20 "}
          onClick={() => {
            dispatch(closeNav("nav-close"));
          }}>
          <IoMdClose />
        </button>
        <ul className="nav-links flex gap-8 justify-between items-center text-[1.05rem] font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className="hover:text-purple-800 duration-300 transition-all ease-in-out"
                onClick={() => {
                  dispatch(closeNav("nav-close"));
                }}>
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="btn flex gap-6 max-lg:gap-5 max-md: justify-center items-center">
          {!isLoggedIn && <Button name="Login" />}
          {!isLoggedIn && <Button name="Signup" />}
          {isLoggedIn && <Button name="Logout" />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
