import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";
import { AppError } from "../utils/appError";

const checkValidations: RequestHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
      const errorMessages = errors.array().map((err) => err.msg);

      const message = errorMessages.join(". ");

      throw new AppError(message, 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const idParamValidators = [
  param("id")
    .exists()
    .toInt()
    .isNumeric()
    .isInt()
    .withMessage("Param needs to be an integer"),
  checkValidations,
];

export const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

export const updateUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  checkValidations,
];

export const artistIdParamValidators = [
  param("artistId")
    .exists()
    .toInt()
    .isNumeric()
    .isInt()
    .withMessage("Param needs to be an integer"),
  checkValidations,
];

export const createArtistValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("genre")
    .isString()
    .withMessage("genre must be a string")
    .notEmpty()
    .withMessage("genre cannot be empty"),
  checkValidations,
];

export const updateArtistValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  checkValidations,
];

export const createAlbumValidators = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty"),
  body("genre")
    .isString()
    .withMessage("genre must be a string")
    .notEmpty()
    .withMessage("genre cannot be empty"),
  checkValidations,
];

export const createSongValidators = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty"),
  checkValidations,
];
