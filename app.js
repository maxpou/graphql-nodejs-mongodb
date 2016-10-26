import express from 'express';
import { json } from 'body-parser';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import graffiti from '@risingstack/graffiti';
import {getSchema} from '@risingstack/graffiti-mongoose';

// Connect mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/graphql');

import Brewery from './models/brewery.model';
import Beer from './models/beer.model';

var app = express();
app.use(json());

// GraphqQL server route
app.use(graffiti.express({
  schema: getSchema([Beer, Brewery]),
  context: {} // custom context
}));

// start server
let server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});

export default server;
