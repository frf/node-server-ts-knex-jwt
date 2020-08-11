import {Request, Response} from 'express';
import db from '../database/connection';
import { sign } from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../configs/auth';
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export default class AuthController {
    async register(request: Request, response: Response) {

        const { name, avatar, email, password, phone, bio } = request.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const uuid = uuidv4();
       
        const { user_id } = request.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                uuid, name, avatar, email, password, phone, bio
            });
        
            const user_id = insertedUsersIds[0];

            const refreshToken = sign(
                { 
                    user_id: uuid, 
                    name: name
                },
                REFRESH_TOKEN_SECRET!,
                {
                    expiresIn: "7d"
                }
            );

            const accessToken = sign({
                user_id: uuid,
                name: name
            }, ACCESS_TOKEN_SECRET!, {
                expiresIn: "15min"
            });

            const dataReturn = {
                'token': accessToken,
                'token_refresh': refreshToken
            };

            console.log(dataReturn);

            await trx.commit();
            return response.json(dataReturn);
    
        } catch (err) {

            await trx.rollback();
            console.log(err);
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }

    async login(request: Request, response: Response) {
        const { user_id } = request.body;

        await db('connections').insert({
            user_id,
        });

        return response.send();
    }
}