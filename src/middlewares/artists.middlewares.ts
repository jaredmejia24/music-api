import { RequestHandler } from "express";

//models
import { prisma } from "../utils/db.utils";

//utils
import { AppError } from "../utils/appError";

export const artistExist: RequestHandler = async (req, res, next) => {
  try {
    const { id, artistId } = req.params;

    const artist = await prisma.artist.findFirst({
      where: { id: Number(id) || Number(artistId), status: "active" },
    });

    if (!artist) {
      throw new AppError("Artist Not Found", 404);
    }

    req.artist = artist;
    next();
  } catch (error) {
    next(error);
  }
};
