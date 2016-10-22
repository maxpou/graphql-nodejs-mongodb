import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Beer',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
