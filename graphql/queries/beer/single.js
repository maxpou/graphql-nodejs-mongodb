import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import beerType from '../../types/beer';
import getProjection from '../../get-projection';
import BeerModel from '../../../models/beer.model';

export default {
  type: beerType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, ctx, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return BeerModel
      .findById(params.id)
      .select(projection)
      .exec();
  }
};
