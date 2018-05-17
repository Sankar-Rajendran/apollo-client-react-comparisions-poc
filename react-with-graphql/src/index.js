import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});



client
    .query({
        query: gql`
        query {
            allTodos{
                id , 
                todoItem , 
                completed
            }
        }
    `
    })
    .then(result => console.log(result));


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
