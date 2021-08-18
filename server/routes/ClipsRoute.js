import express from "express";

import {
  getClips,
  createClip,
  getClip,
  editClip,
  refetchClip,
} from "../controller/ClipsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getClips);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createClip);
router.get("/:id", getClip);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editClip);
router.route("/refetch/:id").patch(authorize([SUPERADMIN, ADMIN]), refetchClip);
export default router;
