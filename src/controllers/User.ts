import { Request, Response, NextFunction } from "express";
import { getCustomRepository, In } from "typeorm";
import { User } from "@repositories";
import { formatErrors } from "@utils";
import { validate } from "class-validator";
import { genSaltSync, hashSync } from "bcryptjs";

enum UserRoles {
  ADMIN,
  COMMON_USER,
  EXTERNAL_USER,
  CALL_ADMIN,
  ARCHIVE_ADMIN
}

class UserController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {

      const { email, name, password, username, role } = req.body;
      
      const userRepository = getCustomRepository(User);

      const user = await userRepository.findOne({ where: { email } });

      if (user) {
        return next({
          status: 409,
          message: "This email is already registered",
        });
      }

      const userData = userRepository.create({
        email,
        name,
        password: hashSync(password, genSaltSync(10)),
        username,
        role,
      });

      const errors = await validate(userData);

      if (errors.length) {
        return next({
          status: 400,
          message: formatErrors(errors),
        });
      }

      const createdUser = await userRepository.save(userData);


      res.locals = {
        ...res.locals,
        status: 201,
        data: createdUser
      };

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message
      });
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userRepository = getCustomRepository(User);

      const user = req.method === 'PATCH'
        ? await userRepository.findOne(id, { select: ['id', 'password']})
        : await userRepository.findOne(id);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
        });
      }

      res.locals = {
        ...res.locals,
        status: 200,
        data: user,
        user,
      };

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message
      });
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
        
      const userRepository = getCustomRepository(User);

      const users = await userRepository.find();

      res.locals = {
        ...res.locals,
        status: 200,
        data: users
      };

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message
      });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;
      const { email, name, username, password, role } = req.body;

      const userRepository = getCustomRepository(User);

      const userData = {
        email,
        name,
        password: password ? hashSync(password, genSaltSync(10)) : user.password,
        username,
        role,
      };

      const errors = await validate(userData);

      if (errors.length) {
        return next({
          status: 400,
          message: formatErrors(errors),
        });
      }

      await userRepository.update(user.id, userData);
      const updatedUser = await userRepository.findOne(user.id);

      res.locals = {
        ...res.locals,
        status: 200,
        data: updatedUser,
        user: updatedUser,
      };

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message
      });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = res.locals;

      const userRepository = getCustomRepository(User);

      await userRepository.delete(user.id);

      res.locals = {
        ...res.locals,
        status: 204,
        message: "User deleted",
      };

      return next();
    } catch (error: any) {
      return next({
        status: 500,
        message: error.message
      });
    }
  }
}

export default new UserController();