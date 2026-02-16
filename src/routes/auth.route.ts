import { Router } from "express";
import { SignUp } from "../controllers/auth.controller";

const router = Router();

router.route("/sign-up").post(SignUp);

export default router;
