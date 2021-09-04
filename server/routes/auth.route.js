import express from "express";

import {
  register,
  login,
  logout,
  authenticate,
} from "../controller/auth.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/register").post(authorize(SUPERADMIN), register);
router.post("/login", login);
router.route("/logout").post(authorize([SUPERADMIN, ADMIN]), logout);
router.route("/authenticate").get(authorize([SUPERADMIN, ADMIN]), authenticate);

export default router;
