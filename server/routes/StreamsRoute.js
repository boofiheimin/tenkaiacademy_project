import express from "express";

import {
  getStreams,
  createStream,
  getStream,
} from "../controller/StreamsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.get("/", getStreams);
router.get("/:id", getStream);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createStream);

export default router;
