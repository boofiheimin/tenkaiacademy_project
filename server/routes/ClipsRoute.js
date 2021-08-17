import express from "express";

import {
  getClips,
  createClip,
  getClip,
} from "../controller/ClipsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getClips);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createClip);
router.get("/:id", getClip);
export default router;
