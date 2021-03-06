# auth-backend

## Contributing & Publishing
### Getting Started
#### 1. Install Dependencies
Run `npm install`

#### 2. Setup Configuration (TODO replace with secret management service)
Run `cp .env.example .env` to create a `.env` file that configuration is relying upon. 

#### 3. Start Application Services (node app, database, etc...)
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

#### 4. Run Database Migrations
We use migration to manage database schema changes through code instead of ad-hoc making changes. We are using
[knex](http://knexjs.org/#Migrations) to run these migrations.

* Bring all migrations up - `docker exec -it auth_backend bash -c "npm run knex -- migrate:latest"`
* Rollback all migrations - `docker exec -it auth_backend bash -c "npm run knex -- migrate:rollback --all"`
* Bring next migration up - `docker exec -it auth_backend bash -c "npm run knex -- migrate:up"`
* Rollback last migration - `docker exec -it auth_backend bash -c "npm run knex -- migrate:rollback"`
* List migrations status - `docker exec -it auth_backend bash -c "npm run knex -- migrate:status"`

### Tests
Testing is a very important part of this codebase. We are not dealing with creating some website or utility package, we
are dealing with a real person's identity on the internet and therefore security and testing need to be a priority.

**Since we are using typescript you should make sure your changes are actually compiling before running the tests or 
else you won't see your changes reflected in the test output. The easiest way to do this is to run the application with `npm run start`, 
since this will auto recompile typescript for you. Alternatively you will need to run `npm run build` before running your tests.**

#### Unit Tests
Run unit tests with `npm run test:unit`, you can also run them in _watch_ mode for faster compilation times `npm run test:unit:watch`.

#### Integration Tests
Integration tests are a little more involved since we rely on external resources like a database. The easiest way to run
the tests locally right now in the `backend` docker container `docker exec -it auth_backend bash -c "SERVER_PORT=4455 npm run test:integration"`.
This is because the connection credentials to the database are using docker networking like `host=db` instead of `host=127.0.0.1`,
so it is easier to run the tests from within the container to avoid changing the database credentials.

Right now running Jest with `--forceExit` because of [this issue](https://github.com/facebook/jest/issues/9473).
This is weird because we are closing the Node server with `server.close()` in an `afterAll` hook.

**Make sure you have the app running first with `npm run start`.**

### Useful Tips
#### Creating New DB Migrations
You can use knex to create new migrations, just run
`docker exec -it auth_backend bash -c "npm run knex -- migrate:make migrations_name" && mv dist/db/migrations/*.ts src/db/migrations`.

* _It would be nice if we didn't have to copy the files from the `dist` directory, but I have not found a workaround to this.
The issue comes down to our knex `migration.directory` needing to be different for generating migrations into `src` vs executing
migrations from `dist`._

#### Fake Data
Check out the [README in the seeds directory](./src/db/seeds/README.md) for the documentation on how to generate fake 
data for testing.

#### GraphQL Schema -> Typescript Definitions
Instead of creating Typescript interfaces manually for our GraphQL schema we can use [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
to do this work for us. Once you modify the schema in [type-defs](./src/graphql/type-defs/) then you should be able to run
`npm run generateTypes` to generate a new [schema interface](./src/interfaces/graphql-schema.ts) file.

## Helpful Resources
* [JWT RFC](https://tools.ietf.org/html/rfc7519)
* [JWS RFC](https://www.rfc-editor.org/rfc/rfc7515)
* [IANA JWT Claim Registry](https://www.iana.org/assignments/jwt/jwt.xhtml)
* [OAuth2 RFC](https://tools.ietf.org/html/rfc6749#section-3.3)
