# DB Seeds
The purpose of database seeds is to fill the database with fake data to make the development process easier.
Most of the seeds you will find in this directory will create random data using [faker](https://github.com/marak/Faker.js/).
We are using [knex CLI](http://knexjs.org/#Seeds-CLI) to execute these seeds. 

## Executing Seeds
Run `docker exec -it auth_backend bash -c "npm run knex -- seed:run"`

It is not uncommon for seeds to delete the previous seed data before adding new data so re-executing seeds
should be a safe operation.

### Seed Ordering
As mentioned in the [knex docs on seeds](http://knexjs.org/#Seeds-CLI) the seeds will be ran in alphabetical order,
so to make it dead simple for us we have prefixed the seed files in this directory with a number. It would be
wise for new seed files to be 10s or 100s of numbers apart so that adding new files to the order is easy and should
not require us to rename every seed file.
