import { makeExecutableSchema } from 'graphql-tools';

import resolvers from "./resolvers";


const typeDefs = [`
type Todo {
    id:String!
    todoItem:String
    completed:Boolean
}

type Message {
    message:String
    todo:Todo
}

type Subscription{
    notifyUsers:  Message
}

type Query {
    allTodos:[Todo]
    todo(id: Int!) : Todo
}

type Mutation {
    addTodo(todoItem : String!)  : [Todo]
    updateTodo(todoId : String!)  : [Todo]
    removeTodo(todoId : String!) : [Todo]
}

schema {
    query:Query
    mutation:Mutation
    subscription:Subscription
}


`];

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});



export default schema;