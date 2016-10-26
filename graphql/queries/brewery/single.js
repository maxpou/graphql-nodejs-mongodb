import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';
import {Types} from 'mongoose';

import breweryType from '../../types/brewery';
import BreweryModel from '../../../models/brewery.model';

export default {
  type: breweryType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, ctx, options) {

    return BreweryModel
      .findById(params.id)
      .exec();
  }
};
