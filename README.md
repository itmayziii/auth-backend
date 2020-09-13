# auth-backend

## Contributing & Publishing
### Getting Started
#### 1. Install Dependencies
Run `npm install`

#### 2. Start Application Services (node app, database, etc...)
Run `npm run start` - this should run docker with Typescript in watch mode, so code compilation and server restarting
should happen automatically when a file changes. You should see the output of `npm run start` let you know when the
server is ready after changes.

i.e.
```
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: Change detected on path dist/graphql/resolvers/clients.js.map for app auth-backend - restarting
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: Stopping app:auth-backend id:0
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: App name:auth-backend id:0 disconnected
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: App [auth-backend:0] exited with code [0] via signal [SIGINT]
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: pid=115 msg=process killed
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: App [auth-backend:0] starting in -cluster mode-
[service] auth_backend | 2020-09-07T23:52:46: PM2 log: App [auth-backend:0] online
[service] auth_backend | Authorization server running at http://localhost:3000
```

#### 3. Run Database Migrations
We use migration to manage database schema changes through code instead of ad-hoc making changes. We are using
[knex](http://knexjs.org/#Migrations) to run these migrations.

* Bring all migrations up - `docker exec -it auth_backend bash -c "npm run knex -- migrate:latest"`
* Rollback all migrations - `docker exec -it auth_backend bash -c "npm run knex -- migrate:rollback --all"`
* Bring next migration up - `docker exec -it auth_backend bash -c "npm run knex -- migrate:up"`
* Rollback last migration - `docker exec -it auth_backend bash -c "npm run knex -- migrate:rollback"`
* List migrations status - `docker exec -it auth_backend bash -c "npm run knex -- migrate:status"`

### Useful Tips
#### Creating New DB Migrations
You can use knex to create new migrations, just run
`docker exec -it auth_backend bash -c "npm run knex -- migrate:make migrations_name" && mv dist/db/migrations/*.ts src/db/migrations`.

* _It would be nice if we didn't have to copy the files from the `dist` directory, but I have not found a workaround to this.
The issue comes down to our knex `migration.directory` needing to be different for generating migrations into `src` vs executing
migrations from `dist`._

#### GraphQL Schema -> Typescript Definitions
Instead of creating Typescript interfaces manually for our GraphQL schema we can use [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
to do this work for us. Once you modify the schema in [type-defs](./src/graphql/type-defs/) then you should be able to run
`npm run generateTypes` to generate a new [schema interface](./src/interfaces/graphql-schema.ts) file.
