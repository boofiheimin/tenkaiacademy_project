import express from "express";

import {
  getTags,
  createTag,
  editTag,
  deleteTag,
} from "../controller/tags.controller.js";

import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteTag);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editTag);
router.get("/", getTags);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createTag);

export default router;
