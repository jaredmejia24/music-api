import { RequestHandler } from "express";

//models
import { prisma } from "../utils/db.utils";

//utils
import { AppError } from "../utils/appError";

export const songExist: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await prisma.song.findFirst({
      where: { id: Number(id), status: "active" },
    });

    if (!song) {
      throw new AppError("Song Not Found", 404);
    }

    req.song = song;
    next();
  } catch (error) {
    next(error);
  }
};
