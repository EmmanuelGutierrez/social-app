import { InMemoryCache, Observable } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import {
  LogoutMutationDocument,
  RotateAccessTokenDocument,
} from "./types/graphql";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

// const httpLink = new HttpLink({
//   uri: "http://localhost:3001/graphql",
//   credentials: "include",
// });
const upliadLink = new UploadHttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

export const apolloClientPlain = new ApolloClient({
  link: upliadLink,
  cache: new InMemoryCache(),
});

async function refreshAccessToken() {
  try {
    
    const { data } = await apolloClientPlain.query({
      query: RotateAccessTokenDocument,
    });
    if (data?.rotateAccessToken) {
      localStorage.setItem("tokenWs", data?.rotateAccessToken.tokenWs);
      return true;
    }
    await apolloClientPlain.mutate({
      mutation: LogoutMutationDocument,
    });
    return false;
  } catch (error) {
    sessionStorage.clear();
    await apolloClientPlain.mutate({
      mutation: LogoutMutationDocument,
    });
    console.log("ERROR", error);
    return false;
  }
}

const errorLink = new ErrorLink(({ forward, error, operation }) => {
  if (!error) {
    return;
  }
  if (
    ["unauthenticated", "unauthorized"].includes(error.message.toLowerCase())
  ) {
    return new Observable((observer) => {
      (async () => {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          window.location.href = "/auth";
          return observer.error(error);
        }
        const suscriber = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
        return () => suscriber.unsubscribe();
      })();
    });
  }
});

/* 
const link = ApolloLink.from([
  new RetryLink(),
  new MyAuthLink(),
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);
*/
const links = ApolloLink.from([errorLink, upliadLink]);

export const apolloClient = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});
