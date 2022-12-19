import { RequestHandler } from "express";

//models
import { prisma } from "../utils/db.utils";

//utils
import { AppError } from "../utils/appError";

export const albumExist: RequestHandler = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await prisma.album.findFirst({
      where: { id: Number(albumId), status: "active" },
    });

    if (!album) {
      throw new AppError("Album Not Found", 404);
    }

    req.album = album;
    next();
  } catch (error) {
    next(error);
  }
};
