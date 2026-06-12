import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

// 1. HTTP connection for Queries and Mutations
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,
  headers: {
    'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
  },
})

// 2. WebSocket connection for Subscriptions (Real-time updates)
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_WS,
    connectionParams: async () => ({
      headers: {
        'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
      },
    }),
  }),
)

// 3. Smart routing: Send subscriptions to WS, and everything else to HTTP
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

// 4. Export the configured client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})