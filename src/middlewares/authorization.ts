import { Request, Response, NextFunction } from 'express';
import { User } from "@models";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { getRepository } from 'typeorm';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default (rulePermission: number[]) => async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {    
    const { authorization } = req.headers;

    if(req.path.indexOf("user") !== -1) return next();

    const userRepository = getRepository(User);

    if (!authorization) {
        return next({
            status: 401,
            message: 'You are not authenticated.',
        });
    }

    const token = authorization.replace('Bearer', '').trim();
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        const { id } = data as TokenPayload;

        const user = await userRepository.findOne(id);

        if (!user) {
            return next({
                status: 401,
                message: 'You are not authenticated.',
            });
        }

        if (rulePermission.indexOf(user.role) === -1) {
            return next({
                status: 401,
                message: 'You do not have permission to access this route.',
            });
        }

        res.locals = {
            ...res.locals,
            status: 200,
            user: id,
            role: user.role
        };

        return next();
    } catch (error) {
        return next({
            status: 401,
            message: 'You are not authenticated.',
        });
    }
};