import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools'
import { PubSub } from 'graphql-subscriptions'

import log from '../../log'
import schema from './schema_def.graphqls'

export const pubsub = new PubSub();

const resolvers = {
  Query: {
    count(ignored1, ignored2, context) {
      return context.Count.getCount();
    },
    photo(root, args, context, info) {
      console.log('photoName', args.photoName);
      return context.Photo.getPhoto(args.photoName);
    }
  },
  Mutation: {
    addCount(_, { amount }, context) {
      return context.Count.addCount(amount)
        .then(() => context.Count.getCount())
        .then(count => {
          pubsub.publish('countUpdated', count);
          return count;
        });
    },
  },
  Subscription: {
    countUpdated(amount) {
      return amount;
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

addErrorLoggingToSchema(executableSchema, { log: (e) => log.error(e) });

export default executableSchema;
