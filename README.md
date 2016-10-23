# GraphQL, NodeJS and MongoDB

[![Build Status](https://travis-ci.org/maxpou/graphql-nodejs-mongodb.svg?branch=master)](https://travis-ci.org/maxpou/graphql-nodejs-mongodb)
[![Coverage Status](https://coveralls.io/repos/github/maxpou/graphql-nodejs-mongodb/badge.svg?branch=master)](https://coveralls.io/github/maxpou/graphql-nodejs-mongodb?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/maxpou/graphql-nodejs-mongodb/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/maxpou/graphql-nodejs-mongodb/?branch=master)

GraphQL server in Node.js using Express, MongoDB (and Mongoose).  
Forked from: https://github.com/bruno12mota/graphql-nodejs. Many thanks to him :)

## Installation&running

1. Install dependencies

    ```sh
    npm install
    ```

2. Populate MongoDB database

    ```sh
    mongoimport --db graphql --collection beers --jsonArray data.json
    ```

3. Running: `npm start`
4. Go to [http://localhost:4000/graphql](http://localhost:4000/graphql) with your browser

## Requests sample

### Queries

* List all beers:

    ```
    {
      beers {
        name
        brewery
        alcohol
        description
      }
    }
    ```

* List all beers + filtering/sorting

    ```
    {
      beers(brewery: "Duvel", orderBy: ALCOHOL) {
        name
        alcohol
      }
    }
    ```


* List one specific beer:

    ```
    {
      beer(id: "<yourIdHere>") {
        name
      }
    }
    ```

### Mutations

* Adding a new beer:

    ```
    mutation {
      addBeer(data: {name: "Delirium Tremens", brewery: "Huyghe Brewery", alcohol: 8.5})
    }
    ```

* Remove a specific beers

    ```
    mutation {
      removeBeer(_id: "<yourIdHere>") {
        name
      }
    }
    ```

* Remove all beers

    ```
    mutation {
      removeAllBeers
    }
    ```

## Tests

Run tests with: `npm test` and tests + code coverage with `npm run coverage-text`.  

More informations about [Chai.js Assertion Library](http://chaijs.com/).
