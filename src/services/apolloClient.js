
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql/',  // Your Django GraphQL URL
  }),
  cache: new InMemoryCache(),
});

export default client;