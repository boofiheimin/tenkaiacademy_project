import express from "express";

import {
  getClips,
  createClip,
  getClip,
  editClip,
  refetchClip,
  deleteClip,
} from "../controller/clips.controller.js";

import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getClips);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createClip);
router.get("/:id", getClip);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editClip);
router.route("/refetch/:id").patch(authorize([SUPERADMIN, ADMIN]), refetchClip);
router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteClip);

export default router;
