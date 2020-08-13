# Overview: 
## Front-End Client (Angular)

An **Angular** front-end built with [@ngrx/store](https://ngrx.io/guide/store) and [@handsontable/angular](https://www.npmjs.com/package/@handsontable/angular) to demonstrate:
- multi-column sorting
- searching
- paging
- persisting on refresh

**Performance best-practices** include:
* [@ngneat/until-destroy](https://www.npmjs.com/package/@ngneat/until-destroy) for unsubscribing from observables
* re-usable modular architecture (see `src/app/lazy/july-table/july-table.module.ts`)
* module lazy-loading and pre-loading during idle/down time

This project includes **Cypress End-to-End** (e2e) tests.

Generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

# How to install

```sh

# clone the repo master branch
git clone https://github.com/charlieargue/clickup-july-table.git

# change directory into the front-end subdirectory
cd clickup-july-table

# install all libraries
npm i
```

# Quick Start

```sh
# start the app locally
npm start
```

Open [http://localhost:4200](http://localhost:4200) to view it in the browser.


# Implementation Notes:
>  resize the columns
- This was part of handsomtable's native functionality, so was not coded nor exercised in e2e tests.

> drag and drop columns to reorder using the native Angular cdk drag and drop
- Also part of handsomtable's native functionality, so was not coded nor exercised in e2e tests. 

> angular fundamentals (directive, pipe)
- My custom directive allows the `ENTER` key to submit the search field. And `async pipes` are used to subscribe to the state observables from inside angular templates.

# Testing

End-to-End (e2e) testing via Cypress is included with this project, and can be found in the `cypress` subdirectory.

```sh
# open Cypress testing tool
npm test
```
Then to run all tests, click the `july_table_spec.js` test file, and you should see:

![Cypress running tests](how-to-cypress-tests.gif)



