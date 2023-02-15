import {
    Request, Response, NextFunction
} from "express"
import "dotenv/config"
import { getCustomRepository } from "typeorm"
import { User } from "@repositories"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body;

            const userRepository = getCustomRepository(User);

            const user = await userRepository.findOne({
                where: { email },
                select: ['id', 'password'] 
            });

            if(!user){
                return next({
                    status: 400,
                    message: 'User exists'
                })
            }

            const isValidPassword = await bcryptjs.compare(password, user.password);

            if(!isValidPassword){
                return next({
                    status: 400,
                    message: "Wrong password"
                })
            }

            const authenticatedUser = await userRepository.findOne({
                where: { email },
                select: [
                    'id',
                    'name',
                    'username',
                    'updatedAt',
                    'createdAt',
                    'email',
                    'role'
                ]
            })

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

            res.locals = {
                ...res.locals,
                status: 200,
                data: { user: { ...authenticatedUser}, token },
              };

            return next();
        } catch(error){
            next(error);
        }
    }


}


export default new AuthController()