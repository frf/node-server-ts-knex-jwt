## Create server NodJS with typescript

## Init project
- yarn init -yp
## Add typescript in project
- yarn add typescript -D
## Init config auto TypeScript
- yarn tsc --init

## Configure ecma script to es2017 in file tsconfig.json line 7 (target)

## Add ts-node-dev wtach codification
- yarn add ts-node-dev -D

## Add script init in package.json
### --transpile-only don't check erros
### --ignore-watch node_modules don't check code in node_modules
### --respawn restart auto

"scripts": {
    "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts"
}

## Add express microframework
- yarn add express

## Add types express
- yarn add @types/express -D

## Use JSON in express
app.use(express.json());

## GET params use request.params
app.post('/users/:id', (request, response) => { 
    console.log(request.params)
})

## Add knex and sqlite3 
- yarn add knex sqlite3

## Create migrations with files em folder migrations and file config knexfile.ts overwrite commands
"knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
"knex:migrate:rollback": "knex --knexfile knexfile.ts migrate:rollback"

## Add cors
- yarn add cors
  
## Add typescript cors
- yarn add @types/cors -D
