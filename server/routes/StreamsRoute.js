import express from "express";

import {
  getStreams,
  createStream,
  getStream,
  refetch_all,
  editStream,
  deleteStream,
  refetchStream,
} from "../controller/StreamsController.js";

import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/refetch_all").get(authorize([SUPERADMIN, ADMIN]), refetch_all);
router.get("/", getStreams);
router.get("/:id", getStream);
router.route("/").post(authorize([SUPERADMIN, ADMIN]), createStream);
router.route("/:id").patch(authorize([SUPERADMIN, ADMIN]), editStream);
router.route("/:id").delete(authorize([SUPERADMIN, ADMIN]), deleteStream);
router
  .route("/refetch/:id")
  .patch(authorize([SUPERADMIN, ADMIN]), refetchStream);

export default router;
