import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'BeerInput',
  fields: {
    name: {
      type: GraphQLString
    },
    brewery: {
      type: GraphQLString
    },
    alcohol: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    }
  }
});
