import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

// Models
import { prisma } from "../utils/db.utils";

// Utils
import { AppError } from "../utils/appError";

dotenv.config();

interface JwtPayload {
  id: number;
}

export const protectSession: RequestHandler = async (req, res, next) => {
  try {
    // Get token
    const { token } = req.cookies;

    // Check if the token was sent or not
    if (!token) {
      throw new AppError("The user is not logged in", 403);
    }

    // Verify the token
    const secret: Secret = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Verify the token's owner
    const user = await prisma.user.findFirst({
      where: { id: decoded.id, status: "active" },
    });

    if (!user) {
      throw new AppError("The owner of the session is no longer active", 403);
    }

    //@ts-expect-error
    delete user.password;
    // Grant access
    req.sessionUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Check the sessionUser to compare to the one that wants to be updated/deleted
export const protectUsersAccount: RequestHandler = (req, res, next) => {
  try {
    const { sessionUser, user } = req;
    // const { id } = req.params;

    // If the users (ids) don't match, send an error, otherwise continue
    if (sessionUser.id !== user.id) {
      throw new AppError("You are not the owner of this account.", 403);
    }

    // If the ids match, grant access
    next();
  } catch (error) {
    next(error);
  }
};

// Create middleware that only grants access to admin users
export const protectAdmin: RequestHandler = (req, res, next) => {
  try {
    const { sessionUser } = req;

    if (sessionUser.role !== "admin") {
      throw new AppError("You do not have the right access level.", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
