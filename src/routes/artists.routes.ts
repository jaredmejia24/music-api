import { artistExist } from "./../middlewares/artists.middlewares";
import { upload } from "./../utils/multer.utils";
import express from "express";

//controllers
import {
  createAlbum,
  createArtist,
  deleteArtist,
  getAllArtists,
  updateArtist,
} from "../controller/artists.controller";

//auth middleware
import { protectSession } from "./../middlewares/auth.middlwares";

//validators
import {
  artistIdParamValidators,
  createAlbumValidators,
  createArtistValidators,
  idParamValidators,
  updateArtistValidators,
} from "../middlewares/validators.middlewares";

const artistsRouter = express.Router();

artistsRouter.get("/", getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post(
  "/",
  upload.single("artistImg"),
  createArtistValidators,
  createArtist
);

artistsRouter.patch(
  "/:id",
  idParamValidators,
  artistExist,
  updateArtistValidators,
  updateArtist
);

artistsRouter.delete("/:id", idParamValidators, artistExist, deleteArtist);

artistsRouter.post(
  "/albums/:artistId",
  artistIdParamValidators,
  artistExist,
  upload.single("albumImg"),
  createAlbumValidators,
  createAlbum
);

export { artistsRouter };
