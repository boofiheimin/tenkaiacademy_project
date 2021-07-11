import express from "express";

import { getStreams, createStream } from "../controller/StreamsController.js";

const router = express.Router();

router.get("/", getStreams);
router.post("/", createStream);

export default router;
