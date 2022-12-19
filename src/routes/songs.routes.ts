import express from "express";

//controllers
import {
  createSong,
  toogleFavoriteSong,
  updateSong,
  getSongsInAnAlbum,
  deleteSong,
} from "./../controller/songs.controller";

//auth middlewares
import { protectSession } from "../middlewares/auth.middlwares";

//validators
import {
  albumIdParamValidators,
  idParamValidators,
} from "../middlewares/validators.middlewares";

//album middlewares
import { albumExist } from "../middlewares/albums.middlewares";

//song middlewares
import { songExist } from "../middlewares/songs.middlewares";

const songsRouter = express.Router();

songsRouter.get(
  "/:albumId",
  albumIdParamValidators,
  albumExist,
  getSongsInAnAlbum
);

songsRouter.use(protectSession);

songsRouter.post("/:albumId", albumIdParamValidators, albumExist, createSong);

songsRouter.patch("/:id", idParamValidators, songExist, updateSong);

songsRouter.delete("/:id", idParamValidators, songExist, deleteSong);
    
songsRouter.post(
  "/favorite/:id",
  idParamValidators,
  songExist,
  toogleFavoriteSong
);

export { songsRouter };
