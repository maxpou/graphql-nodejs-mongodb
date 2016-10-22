import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import beerInputType from '../../types/beer-input';
import BeerModel from '../../../models/beer.model';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(beerInputType)
    }
  },
  async resolve (root, params, options) {
    const beerModel = new BeerModel(params.data);
    const newBeer = await beerModel.save();

    if (!newBeer) {
      throw new Error('Error adding new beer');
    }
    return true;
  }
};
