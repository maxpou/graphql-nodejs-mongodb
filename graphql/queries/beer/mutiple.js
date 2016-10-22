import {
  GraphQLList
} from 'graphql';

import beerType from '../../types/beer';
import getProjection from '../../get-projection';
import BeerModel from '../../../models/beer.model';

export default {
  type: new GraphQLList(beerType),
  args: {},
  resolve (root, params, ctx, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return BeerModel
      .find()
      .select(projection)
      .exec();
  }
};
