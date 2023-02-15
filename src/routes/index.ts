import { Router, Request, Response, NextFunction } from "express";
import UserRouter from "./User";
import AuthRouter from "./Auth";

const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;