import { RequestHandler } from "express";
import { prisma } from "../utils/db.utils";

export const createSong: RequestHandler = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { album } = req;

    const newSong = await prisma.song.create({
      data: { title, albumId: album.id },
    });

    res.status(201).json({
      status: "success",
      data: {
        newSong,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSongsInAnAlbum: RequestHandler = async (req, res, next) => {
  try {
    const { album } = req;

    const songs = await prisma.song.findMany({
      where: { albumId: album.id, status: "active" },
      include: { album: { include: { artist: true } } },
    });

    res.status(200).json({
      status: "success",
      data: {
        songs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSong: RequestHandler = async (req, res, next) => {
  try {
    const { song } = req;
    const { title } = req.body;

    const songUpdated = await prisma.song.update({
      where: { id: song.id },
      data: { title },
    });

    res.status(200).json({
      status: "success",
      data: {
        song: songUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSong: RequestHandler = async (req, res, next) => {
  try {
    const { song } = req;

    await prisma.song.update({
      where: { id: song.id },
      data: { status: "disabled" },
    });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const toogleFavoriteSong: RequestHandler = async (req, res, next) => {
  try {
    const { song, sessionUser } = req;

    const favoriteSong = await prisma.favoriteSong.findFirst({
      where: { userId: sessionUser.id, songId: song.id },
      select: {
        id: true,
        favorite: true,
      },
    });

    //favorite song already exist in the model
    if (favoriteSong) {
      const favoriteSongUpdated = await prisma.favoriteSong.update({
        where: { id: favoriteSong.id },
        data: { favorite: !favoriteSong.favorite },
      });

      return res.status(200).json({
        status: "success",
        data: {
          favoriteSong: favoriteSongUpdated,
        },
      });
    }

    //first time user marking the song favorite
    const newFavoriteSong = await prisma.favoriteSong.create({
      data: {
        userId: sessionUser.id,
        songId: song.id,
        favorite: true,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        favoriteSong: newFavoriteSong,
      },
    });
  } catch (error) {
    next(error);
  }
};
