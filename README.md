# Job Interview
Application to manage my job interviews.

## Run
1. create an environment (`.env`) file from `.env.example`
2. create a secret token and paste in env file (SECRET_TOKEN)
`npm run secret`
3. create a database
4. run migrations and seed you database:
`npm run db:migrate; npm run db:seed`
5. Enjoy your app `node index.js`