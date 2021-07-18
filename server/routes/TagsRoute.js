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

router.get("/", getTags);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createTag);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editTag);
router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteTag);

export default router;
