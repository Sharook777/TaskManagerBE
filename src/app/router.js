import express from "express";
import { check } from "express-validator";

import taskList from "./tasks/list.js";
import createTask from "./tasks/create.js";
import getTask from "./tasks/get.js";
import updateTask from "./tasks/update.js";
import deleteTask from "./tasks/delete.js";

import resetPassword from "./user/resetPassword.js";

const appRouter = express.Router();

const taskValidationRules = [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
];

appRouter.get("/tasks", taskList);
appRouter.post("/task", taskValidationRules, createTask);
appRouter.get("/task/:id", getTask);
appRouter.put("/task/:id", taskValidationRules, updateTask);
appRouter.delete("/task/:id", deleteTask);

appRouter.post(
  "/reset-password",
  [
    check("currentPasword").not().isEmpty(),
    check("newPassword").not().isEmpty(),
  ],
  resetPassword
);

export default appRouter;
