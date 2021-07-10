import express from "express";

import {
  getStreams,
  createStream,
  getAllKanata,
} from "../controller/StreamsController.js";

const router = express.Router();

router.get("/", getStreams);
router.post("/", createStream);
// Dangerous route active if reset is needed
//router.get("/getAllKanata", getAllKanata);

export default router;
