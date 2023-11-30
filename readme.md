# Technical testing Task

[![CircleCI](https://circleci.com/gh/cci-crs9f/testing-task.svg?style=svg)](https://circleci.com/gh/cci-crs9f/testing-task)

## 1. Testing the UI of [this](http://automationpractice.multiformis.com/) website

this part tests **contact us** form and the **search Bar** of the website using [Nightwatch](https://nightwatchjs.org/)

to run this project, clone the repository then open the terminal
```
cd UI-testing/
npm install
npm test
```
> **NOTE**: make sure to have ```Node.js >= v18 and npm >= v9```

### Test Cases

Testcase # | entity | scenarios | validation
--- | --- | --- | ---
1 | Contact us Form | open contact us page | form is visible to the user and accessable
2 | Contact us Form | **subject heading**: not selected <br/> **email**: empty <br/> **order Reference**: empty <br/> **file**: Not selected <br/> **message**: empty <br/> clicks **send** | error alert is shown and submission fails
3 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: Not selected <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful
4 | Contact us Form | **subject heading**: selected <br/> **email**: empty <br/> **order Reference**: empty <br/> **file**: empty <br/> **message**: empty <br/> clicks **send** | error alert is shown with 2 error lines and submission fails
5 | Contact us Form | **subject heading**: Not selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: Not selected <br/> **message**: empty <br/> clicks **send** | error alert is shown with 2 error lines and submission fails
6 | Contact us Form | **subject heading**: Not selected <br/> **email**: invalid input <br/> **order Reference**: empty <br/> **file**: Not selected <br/> **message**: empty <br/> clicks **send** | error alert is shown with 3 error lines and submission fails
7 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful
8 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: .docx file <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful
9 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: .js file <br/> **message**: written <br/> clicks **send** | error alert is shown and submission fails
10 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: .exe file <br/> **message**: written <br/> clicks **send** | error alert is shown and submission fails
11 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: written <br/> **file**: Not selected <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful
12 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: written <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful 
13 | Contact us Form | **subject heading**: selected <br/> **email**: invalid input <br/> **order Reference**: written <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | error alert is shown with 'Invalid email address' error line
14 | Contact us Form | **subject heading**: Not selected <br/> **email**: valid input <br/> **order Reference**: written <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | error alert is shown with 'Please select a subject' error line
15 | Contact us Form | **subject heading**: selected <br/> **email**: empty <br/> **order Reference**: written <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | error alert is shown with 'Invalid email address' error line
16 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: empty <br/> **file**: .txt file <br/> **message**: written <br/> clicks **send** | success alert is shown and submission is successful
17 | Contact us Form | **subject heading**: selected <br/> **email**: valid input <br/> **order Reference**: written <br/> **file**: .txt file <br/> **message**: empty <br/> clicks **send** | error alert is shown with 'The message cannot be blank' error line
18 | search Bar | Query: dress <br/> clicks **search button** | products shown in the results is greater than 0
19 | search Bar | opens homepage | search Bar is visible and accessable
20 | search Bar | Query: dress <br/> clicks **search button** | "search DRESS" shown on the top of the results

### Bug Tickets

Title | Resulting and expected behaviour | Test Data
--- | --- | ---
number of errors shown upon <br/>attempting to submit is not correct | expected to show 2 errors, result is 1 error | **subject heading**: Not selected <br/> **email**: valid input <br/> **order Reference**: written <br/> **file**: Not selected <br/> **message**: empty
number of errors shown upon <br/>attempting to submit is not correct | expected to show 2 errors, result is 1 error | **subject heading**: selected <br/> **email**: empty or invalid <br/> **order Reference**: written <br/> **file**: Not selected <br/> **message**: empty
number of errors shown upon <br/>attempting to submit is not correct | expected to show 3 errors, result is 1 error | **subject heading**: Not selected <br/> **email**: invalid input <br/> **order Reference**: written <br/> **file**: Not selected <br/> **message**: empty

## 1. Testing the APIs that [mock-user-auth](https://github.com/thiagoluiznunes/mock-user-auth) provides

this part tests all API routes of the module mock-user-auth using [supertest](https://www.npmjs.com/package/supertest), used [chai](https://www.npmjs.com/package/chai) for assertions and [mocha](https://www.npmjs.com/package/mocha) for running tests and generating html report

to run this project, clone the repository then open the terminal
```
cd API-testing/
npm install
```

you should start the mock-user-auth module to be able to send requests to it
```
npm run dev
```

now in another terminal, run the API tests
```
npm run test
```

> **NOTE**: make sure to have ```Node.js >= v18 and npm >= v9```