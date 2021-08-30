import express from "express";

import {
  getArtists,
  createArtist,
  editArtist,
  deleteArtist,
} from "../controller/ArtistsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteArtist);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editArtist);
router.get("/", getArtists);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createArtist);

export default router;
