import {
  GraphQLList,
  GraphQLString
} from 'graphql';

import beerType from '../../types/beer';
import BeerModel from '../../../models/beer.model';

export default {
  type: new GraphQLList(beerType),
  args: {
    brewery: { type: GraphQLString }
  },
  resolve (root, params) {

    return BeerModel
      .find(params)
      .exec();
  }
};
