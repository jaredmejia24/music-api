import { RequestHandler } from "express";
import { prisma } from "../utils/db.utils";

export const getAllArtists: RequestHandler = async (req, res, next) => {
  try {
    const artists = await prisma.artist.findMany({
      where: { status: "active" },
      include: { albums: true },
    });

    res.status(200).json({
      status: "success",
      data: {
        artists,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createArtist: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const updateArtist: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteArtist: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const createAlbum: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
