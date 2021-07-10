import express from "express";

import {
  register,
  login,
  logout,
  authenticate,
} from "../controller/AuthController.js";
import { authorize } from "../middleware/AuthMiddleware.js";
import { ADMIN, SUPERADMIN } from "../constants/userRoles.js";

const router = express.Router();

router.route("/register").post(authorize(SUPERADMIN), register);
router.post("/login", login);
router.route("/logout").post(authorize([SUPERADMIN, ADMIN]), logout);
router.route("/authenticate").get(authorize([SUPERADMIN, ADMIN]), authenticate);

export default router;
