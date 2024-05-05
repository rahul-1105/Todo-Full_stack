import { Router } from "express";
import { login, signup } from "../controller/user.controller.mjs";


const routes = Router();

routes.post("/signup", signup);
routes.post("/login", login);

export default routes;