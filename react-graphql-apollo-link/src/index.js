import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { split } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const cache = new InMemoryCache();


const defaults = {
    toggleCompletedVisibility: false
};


const resolvers = {
    Mutation: {
        toggleCompletedTodos: (_,{ toggleCompletedVisibility }, { cache }) => {
            cache.writeData({ data: { toggleCompletedVisibility: toggleCompletedVisibility } });
            return null;
        }

    }
}


const stateLink = withClientState({ resolvers, cache, defaults });


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


const client = new ApolloClient({ link: ApolloLink.from([stateLink, httpLink]), cache });


ReactDOM.render(
    (<ApolloProvider client={client}>
        <App />
    </ApolloProvider>), document.getElementById('root'));
registerServiceWorker();
