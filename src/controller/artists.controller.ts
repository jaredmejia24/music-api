import { RequestHandler } from "express";
import { prisma } from "../utils/db.utils";

//firebase
import { uploadImg } from "../utils/firebase.utils";

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
    const { name, genre } = req.body;

    const imgUrl = await uploadImg({ req, title: name, modelName: "artist" });

    const newArtist = await prisma.artist.create({
      data: {
        name,
        genre,
        imgUrl,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        newArtist,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateArtist: RequestHandler = async (req, res, next) => {
  try {
    const { artist } = req;
    const { name } = req.body;

    const updatedArtist = await prisma.artist.update({
      where: { id: artist.id },
      data: { name },
    });

    res.status(200).json({
      status: "success",
      data: {
        artist: updatedArtist,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArtist: RequestHandler = async (req, res, next) => {
  try {
    const { artist } = req;

    await prisma.artist.update({
      where: { id: artist.id },
      data: { status: "disabled" },
    });

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

export const createAlbum: RequestHandler = async (req, res, next) => {
  try {
    const { artist } = req;
    const { title, genre } = req.body;

    const imgUrl = await uploadImg({ req, title, modelName: "album" });

    const newAlbum = await prisma.album.create({
      data: {
        title,
        genre,
        imgUrl,
        artistId: artist.id,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        newAlbum,
      },
    });
  } catch (error) {
    next(error);
  }
};
