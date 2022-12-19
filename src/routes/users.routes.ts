import express from "express";

//middlewares
import {
  protectAdmin,
  protectSession,
  protectUsersAccount,
} from "./../middlewares/auth.middlwares";

//validators
import {
  createUserValidators,
  idParamValidators,
  updateUserValidators,
} from "./../middlewares/validators.middlewares";

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

//user middlewares
import { userExists } from "../middlewares/users.middlewares";

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.post("/logout", logout);

usersRouter.patch(
  "/:id",
  idParamValidators,
  userExists,
  protectUsersAccount,
  updateUserValidators,
  updateUser
);

usersRouter.delete(
  "/:id",
  idParamValidators,
  userExists,
  protectUsersAccount,
  deleteUser
);

usersRouter.use(protectAdmin);

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", idParamValidators, userExists, getUserById);

export { usersRouter };
