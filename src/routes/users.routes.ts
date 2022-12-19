import express from "express";

//middlewares
import {
  protectAdmin,
  protectSession,
  protectUsersAccount,
} from "./../middlewares/auth.middlwares";

//validators
import { createUserValidators } from "./../middlewares/validators.middlewares";

//controllers
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} from "../controller/users.controller";
import { userExists } from "../middlewares/users.middlewares";

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.post("/logout", logout);

usersRouter.get("/", getAllUsers);

usersRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

usersRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

usersRouter.use(protectAdmin);

usersRouter.get("/:id", userExists, getUserById);

export { usersRouter };
