import express from "express";

import {
  getTags,
  createTag,
  editTag,
  deleteTag,
} from "../controller/TagsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteTag);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editTag);
router.get("/", getTags);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createTag);

export default router;
