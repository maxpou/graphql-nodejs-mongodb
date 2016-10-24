import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import beerType from '../../types/beer';
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

    return BeerModel
      .findById(params.id)
      .populate('brewery')
      .exec();
  }
};
