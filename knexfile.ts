import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        // filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
        host : '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'nutdiet'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
};