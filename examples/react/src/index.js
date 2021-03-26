import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = createHttpLink({
  uri: 'https://api.spacex.land/graphql/'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'))
