import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET } from "../configs/auth";

export default function auth(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json( {error: 'No token provider'});

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).json( {error: 'Token error parts'});

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json( {error: 'Token erro format'});

    jwt.verify(token, ACCESS_TOKEN_SECRET, (erro, decode) => {
        if (erro) return res.status(401).json( {error: 'Token invalid'});

        console.log('OKOKO')

        return next();
    });
}