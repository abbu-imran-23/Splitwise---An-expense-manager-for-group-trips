import express, { Router } from "express";
import { register, login } from "../controllers/Auth";

const router: Router = express.Router();

/*     AUTH ROUTES     */
router.post("/register", register);
router.post("/login", login);

export default router;