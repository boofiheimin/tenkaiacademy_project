import express from "express";

import {
  getSongs,
  createSong,
  editSong,
  deleteSong,
} from "../controller/songs.controller.js";

import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteSong);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editSong);
router.get("/", getSongs);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createSong);

export default router;
