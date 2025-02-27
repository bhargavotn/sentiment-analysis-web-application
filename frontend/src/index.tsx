import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: '/graphql',  // Relative path, proxied by Nginx to backend:8000/graphql
  cache: new InMemoryCache(),
  headers: {
    'X-API-Key': 'newsecretkey123'
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);