import express from "express";

import {
  getMusicRecords,
  createMusicRecord,
} from "../controller/musicRecords.controlller.js";

import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getMusicRecords);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createMusicRecord);

export default router;
