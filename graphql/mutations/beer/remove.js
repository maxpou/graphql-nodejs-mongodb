import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import beerType from '../../types/beer';
import BeerModel from '../../../models/beer.model';

export default {
  type: beerType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const removedBeer = await BeerModel
      .findByIdAndRemove(params._id)
      .exec();

    if (!removedBeer) {
      throw new Error('Error removing beer');
    }

    return removedBeer;
  }
};
