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

const artistsRouter = express.Router();

artistsRouter.get("/", getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post("/", createArtist);

artistsRouter.patch("/:id", updateArtist);

artistsRouter.delete("/:id", deleteArtist);

artistsRouter.post("/albums/:artistId", createAlbum);

export { artistsRouter };
