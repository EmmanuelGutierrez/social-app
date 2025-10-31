import { InMemoryCache } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost3001/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
