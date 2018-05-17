import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema';


const PORT = 4000;

const app = express();

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

const server = createServer(app);

server.listen(PORT, () => {
    console.log("Server started listening on " + PORT);
    new SubscriptionServer({
        execute,
        subscribe,
        schema: schema,        
    }, {
            server: server,
            path: '/subscriptions'
        });
})