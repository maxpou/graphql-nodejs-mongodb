import {
  GraphQLBoolean
} from 'graphql';

import BeerModel from '../../../models/beer.model';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return BeerModel
      .remove({})
      .exec();
  }
};
