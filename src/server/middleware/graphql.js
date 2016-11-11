import { apolloExpress } from 'apollo-server'
import 'isomorphic-fetch'

import schema from '../api/schema'
import Count from '../sql/count'
import Photo from '../sql/photo'

export default apolloExpress(() => {
  return {
    schema,
    context: {
      Count: new Count(),
      Photo: new Photo(),
    },
  };
});