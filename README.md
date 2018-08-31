# lattis-test-project

## How to run the project
- Clone the repo
- install dependencies by running `npm install`
- start the server by running `npm run dev`
- run the test code by running `npm test`

Notes:
- I have used sequelize as database ORM and currently supporting sqlite, mysql and postgresql. For testing and development, we can use sqllite which doesn't require any physical database servers.
- I have implemented all REST api routes defined in specification documentation.
- Authentication is implemented using JWT.
- Integration Tests are implemented for all user routes using Jest
- You can check the coverage report in coverage folder after running tests.
- Eslint is setup and we run eslint before run the test code to make sure all codes are eslint free.
