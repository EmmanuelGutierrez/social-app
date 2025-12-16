import { InMemoryCache, Observable } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import {
  LogoutMutationDocument,
  RotateAccessTokenDocument,
} from "./types/graphql";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// const httpLink = new HttpLink({
//   uri: "http://localhost:3001/graphql",
//   credentials: "include",
// });
const uploadLink = new UploadHttpLink({
  uri: `${process.env["NEXT_PUBLIC_PROD"] ? "https" : "http"}://${
    process.env["BACKEND_URL"] ?? process.env["NEXT_PUBLIC_BACKEND_URL"]
  }/graphql`,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${
      process.env["BACKEND_URL"] ?? process.env["NEXT_PUBLIC_BACKEND_URL"]
    }/graphql`,
    on:{
      connected(){
        console.log("CWS onnected")
      },
      error(){
        console.log("WS Error")
      },
      closed(){
        console.log("WS Closed")
      }
      
    },
    connectionParams() {
      const token= localStorage.getItem("tokenWs")
      console.log("TOKEN WS", token)
      return {
        Authorization: `${token}`,
      };
    },
  })
);

export const apolloClientPlain = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

async function refreshAccessToken() {
  try {
    const { data, error } = await apolloClientPlain.mutate({
      mutation: RotateAccessTokenDocument,
      fetchPolicy: "no-cache",
    });
    console.log("DATA AND ERROR", data, error);
    if (data?.rotateAccessToken) {
      localStorage.setItem("tokenWs", data?.rotateAccessToken.tokenWs);
      // wsLink.client.dispose();
      // wsLink.client.
      return true;
    }
    await apolloClientPlain.mutate({
      mutation: LogoutMutationDocument,
    });
    return false;
  } catch (error) {
    console.log("ERROR");
    sessionStorage.clear();
    await apolloClientPlain.mutate({
      mutation: LogoutMutationDocument,
    });
    console.log("ERROR", error);
    return false;
  }
}

const errorLink = new ErrorLink(({ forward, error, operation }) => {
  console.log("ERROR 1", error.message, error.name, error.stack);

  let isAuthError = false;

  if (error) {
    isAuthError = ["unauthenticated", "unauthorized"].includes(
      error.message.toLowerCase()
    );
    console.log(
      "IS AUTH ERROR",
      isAuthError,
      ["unauthenticated", "unauthorized"].includes(error.message.toLowerCase()),
      error.message.toLowerCase()
    );
  }

  if (!error) {
    return;
  }
  if (isAuthError) {
    return new Observable((observer) => {
      (async () => {
        const refreshed = await refreshAccessToken();
        console.log("REFRESHED", refreshed);
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

const links = ApolloLink.from([errorLink, uploadLink]);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  links
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myFeed: {
            keyArgs: false,
            merge(
              existing: {
                data: { post: { __ref?: string; _id?: string } }[];
                nextCursor?: string | null;
                hasMore: boolean;
              } = {
                data: [],
                nextCursor: null,
                hasMore: false,
              },
              incoming: {
                data: { post: { __ref?: string; _id?: string } }[];
                nextCursor?: string | null;
                hasMore: boolean;
              }
            ) {
              console.log("MERGE", incoming, existing);
              const existingIds = existing.data.map(
                (post) => post.post.__ref || `Post:${post.post._id}`
              );

              const data = [
                ...existing.data,
                ...incoming.data.filter(
                  (p) =>
                    !existingIds.includes(p.post.__ref || `Post:${p.post._id}`)
                ),
              ];
              console.log("Data", data);

              const newFeedData = {
                ...incoming,
                data,
              };
              console.log(
                "NEW DATA",
                existing.data,
                incoming.data,
                newFeedData
              );
              return newFeedData;
            },
          },
        },
      },
    },
  }),
});
