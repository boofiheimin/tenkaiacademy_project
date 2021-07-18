import express from "express";

import {
  getStreams,
  createStream,
  getStream,
  refetch_all,
} from "../controller/StreamsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/refetch_all").get(authorize([SUPERADMIN, ADMIN]), refetch_all);
router.get("/", getStreams);
router.get("/:id", getStream);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createStream);

export default router;
