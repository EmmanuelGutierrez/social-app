import { InMemoryCache, Observable } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import {
  LogoutMutationDocument,
  MyFeedQuery,
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
  console.log("ERROR 1", error.message, error.name, error.stack);

  let isAuthError = false;

  if (error) {
    isAuthError = ["unauthenticated", "unauthorized"].includes(
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
  // else {
  //   console.log("ERROR 3", isAuthError)
  //   // "funcione para todos los errores" -> Logout
  //   // We can't easily await the logout mutation here if we return void,
  //   // but we can fire it and redirect.
  //   sessionStorage.clear();
  //   // Optional: Trigger logout mutation fire-and-forget
  //   apolloClientPlain.mutate({ mutation: LogoutMutationDocument }).then(() => {

  //     window.location.href = "/auth";
  //   }).catch(console.error);
  // }
});

// const errorLink = new ErrorLink(({ error, forward, operation }) => {
//   // 1. Identify if it's an Auth Error
//   let isAuthError = false;

//   if (error) {
//     isAuthError = ["unauthenticated", "unauthorized"].includes(error.message.toLowerCase())
//   }

//   // // Also check networkError if needed (e.g. 401)
//   // if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
//   //   isAuthError = true;
//   // }
//   // 2. Handle Auth Error (Refresh Flow)
//   if (isAuthError) {
//     return new Observable((observer) => {
//       refreshAccessToken().then((refreshed) => {
//         if (!refreshed) {
//           // Refresh failed -> Logout
//           window.location.href = "/auth";
//           observer.error(error || new Error("Auth failed"));
//           return;
//         }

//         // Refresh success -> Retry
//         const subscription = forward(operation).subscribe({
//           next: observer.next.bind(observer),
//           error: observer.error.bind(observer),
//           complete: observer.complete.bind(observer),
//         });
//         return () => subscription.unsubscribe();
//       }).catch((err) => {
//         observer.error(err);

//       });
//     });
//   }
//   // 3. Handle All Other Errors (Logout Flow)
//   if (error) {
//     // "funcione para todos los errores" -> Logout
//     // We can't easily await the logout mutation here if we return void,
//     // but we can fire it and redirect.
//     sessionStorage.clear();
//     // Optional: Trigger logout mutation fire-and-forget
//     apolloClientPlain.mutate({ mutation: LogoutMutationDocument }).catch(console.error);
//     window.location.href = "/auth";
//   }
// });

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myFeed: {
            keyArgs: false,
            merge(
              existing: MyFeedQuery["myFeed"] = {
                data: [],
                nextCursor: null,
                hasMore: false,
                inDb: 0,
                inThisPage: 0,
              },
              incoming: MyFeedQuery["myFeed"]
            ) {
              console.log(
                "MERGE",
                incoming.hasMore,
                existing.nextCursor,
                incoming.nextCursor
              );
              // if (!existing) {
              //   return incoming;
              // }
              const newData = {
                ...incoming,
                data: [...existing.data, ...incoming.data],
              };
              console.log("NEW DATA", existing.data, incoming.data, newData);
              return newData;
            },
          },
        },
      },
    },
  }),
});
