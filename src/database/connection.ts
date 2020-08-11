import knex from 'knex';
import path from 'path';

// const db = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: path.resolve(__dirname, 'database.sqlite')
//     },
//     useNullAsDefault: true
// });

const db = knex({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'nutdiet'
    },
    useNullAsDefault: true
});


export default db;