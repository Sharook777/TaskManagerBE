import express from "express";
import { check } from "express-validator";

import { loginController } from "./login.js";
import { registerController } from "./register.js";

const authRouter = express.Router();

const loginRules = [
  check("email").not().isEmpty(),
  check("password").not().isEmpty(),
];

const registrationRules = [
  check("email").not().isEmpty(),
  check("password").not().isEmpty(),
  check("name").not().isEmpty(),
];

authRouter.post("/login", loginRules, loginController);
authRouter.post("/register", registrationRules, registerController);

export default authRouter;
