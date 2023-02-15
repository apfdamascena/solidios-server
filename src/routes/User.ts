import { Router } from "express";

import { User } from "@controllers";

const UserRouter = Router();


UserRouter
  .route("/")
  .post(User.create)
  .get(User.readAll);

UserRouter
  .route("/:id")
  .get(User.read)
  .patch(User.read, User.update)
  .delete(User.read, User.delete)

export default UserRouter;