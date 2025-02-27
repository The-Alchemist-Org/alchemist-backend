# The Alchemist backend

Environment:
`.env` file is used by production and dev environment. `.env.test` is used for running tests.

To run the project locally:
```shell
cp .env.example .env # and fill in the correct values
npm run dev 
```

or using docker:
```shell
docker compose up
```
Note: when running app using docker, make sure you run all the migrations from ***Inside the container***:
Example:
```shell
docker exec -it 8532 /bin/bash # connect to container
npm run migrate:run && npm run seed
```
Note: To generate a value for TOKEN env var:
```shell
openssl rand -base64 128
```

Migrations:
```shell
# create new migration
npx typeorm migration:create ./src/database/migrations/UserModel

# migrate pending migrations - default connection
npm run migrate:run
# clean migrations - default connection
npm run migrate:clean-run
# test connection
npm run test:migrate:run

# revert latest migration - default connection
npm run migrate:revert
# test connection
npm run test:migrate:revert

# seed database - default connection
npm run seed
# test connection
npm run test:seed
```

Run tests:
```shell
npm test
```

## API documentation

This project uses swagger available at [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) when env === `development`. Swagger docs are autoupdated on build.
