import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Brewery',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    }
  }
});
