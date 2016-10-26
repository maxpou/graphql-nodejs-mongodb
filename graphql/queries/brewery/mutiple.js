import {
  GraphQLList,
  GraphQLString,
  GraphQLEnumType
} from 'graphql';

import breweryType from '../../types/brewery';
import BreweryModel from '../../../models/brewery.model';

export default {
  type: new GraphQLList(breweryType),
  args: {},
  resolve (root, params) {

    return BreweryModel
      .find()
      .sort()
      .exec();
  }
};
