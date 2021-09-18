import express from "express";

import {
  getMusicRecords,
  createMusicRecord,
  editMusicRecord,
  deleteMusicRecord,
} from "../controller/musicRecords.controlller.js";

import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getMusicRecords);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createMusicRecord);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editMusicRecord);
router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteMusicRecord);

export default router;
