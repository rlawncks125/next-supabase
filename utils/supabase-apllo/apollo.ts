import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import { createClient } from "../supabase/client";

// const cache = new InMemoryCache({
// dataIdFromObject(responseObject) {
//   if ("nodeId" in responseObject) {
//     return `${responseObject.nodeId}`;
//   }

//   return defaultDataIdFromObject(responseObject);
// },
// possibleTypes: { Node: ['notes'] } // optional, but useful to specify supertype-subtype relationships
// typePolicies: {
//   Query: {
//     fields: {
//       notesCollection: relayStylePagination(), // example of paginating a collection
//       node: {
//         read(_, { args, toReference }) {
//           const ref = toReference({
//             nodeId: args?.nodeId,
//           })

//           return ref
//         },
//       },
//     },
//   },
// },
// });

const httpLink = createHttpLink({
  uri: "https://ezxkitaclufybidjpyzk.supabase.co/graphql/v1",
});

const authLink = setContext(async (_, { headers }) => {
  const supabase = createClient();
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
