import {
  GraphQLList,
  GraphQLString,
  GraphQLEnumType
} from 'graphql';

import beerType from '../../types/beer';
import BeerModel from '../../../models/beer.model';
import BreweryModel from '../../../models/brewery.model';

export default {
  type: new GraphQLList(beerType),
  args: {
      brewery: { type: GraphQLString },
      orderBy: {
          type: new GraphQLEnumType({
            name: 'orderBy',
            values: {
              NAME: { value: "name" },
              BREWERY: { value: "brewery" },
              ALCOHOL: { value: "alcohol" }
            }
          })
      }
  },
  resolve (root, params) {
    let orderBy = {};
    if (params.orderBy) {
        orderBy = params.orderBy;
        delete params.orderBy;
    }

    return BeerModel
      .find(params)
      .populate('brewery')
      .sort(orderBy)
      .exec(function(err, beers) {
        console.log(beers);
      });
  }
};
