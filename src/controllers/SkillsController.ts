import {Request, Response} from 'express';
import db from '../database/connection';

export default class SkillsController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const lang = filters.lang as string;

        if (!lang) {
            response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const classes = await db('classes')
            .where('classes.lang', '=', lang)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['users.*','classes.*']);
        
        return response.json(classes);
    }

    async create (request: Request, response: Response) { 
        const {
            name,
            avatar,
            whatsapp,
            bio,
            langs,
            cost
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx('skills').insert({
                langs,
                cost,
                user_id
            });
    
            await trx.commit();
    
            return response.status(201).send();
    
        } catch (err) {
    
            await trx.rollback();
            console.log(err);
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}