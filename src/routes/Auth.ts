import { Router } from "express"
import {
    Auth
} from "@controllers"

const AuthRouter = Router();

AuthRouter
  .route("/")
  .post(Auth.login)

export default AuthRouter;