import {
  GraphQLBoolean
} from 'graphql';

import BlogPostModel from '../../../models/blog-post.model';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return BlogPostModel
      .remove({})
      .exec();
  }
};
