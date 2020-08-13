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


# change directory into the front-end subdirectory
cd fe

# install all libraries
npm i
```

# Quick Start

You will need to grab a `.env` environment variable file:
```
🛑 Both the front-end and the back-end will not work without the correct .env files!
```

```sh
# start the app locally
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Libraries Used

- `@apollo/client`
- `react-bootstrap`
- `graphql`
- `lodash`
- `moment`
- `google-maps-react`
- `react-geocode`

# Testing

End-to-End (e2e) testing via Cypress is included with this project, and can be found in the `cypress` subdirectory.

Testing is only for local environments at this stage, so:
```
🛑 Both the front-end and the back-end MUST BE RUNNING locally for the tests to work!
```

```sh
# open Cypress testing tool
npm test
```

![Cypress testing tool](how-to-test-01.png)

Then to run all tests, click the `user_spec.js` test file, and you should see:

![Cypress running tests](how-to-cypress-tests.gif)



