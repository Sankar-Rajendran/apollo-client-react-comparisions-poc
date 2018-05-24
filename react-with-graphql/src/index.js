import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, InMemoryCache, HttpLink, split } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// Create an http link:
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/subscriptions`,
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);


const client = new ApolloClient({ link, cache: new InMemoryCache() });


ReactDOM.render(
    (<ApolloProvider client={client}>
        <App />
    </ApolloProvider>), document.getElementById('root'));
registerServiceWorker();
