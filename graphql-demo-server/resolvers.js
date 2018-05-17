var _ = require('lodash');

import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

let todosList = [
    { id: 1, todoItem: "Todo 1", completed: true },
    { id: 2, todoItem: "Todo 2", completed: false }
]

const TOD_ADDED = 'TOD_ADDED';
const TODO_REMOVED = 'TODO_REMOVED';
const TODO_UPDATED = 'TODO_UPDATED';

const resolvers = {    
    Subscription: {
        notifyUsers: {
            subscribe: () => pubsub.asyncIterator([TOD_ADDED, TODO_REMOVED, TODO_UPDATED]),            
        }
    },
    Query: {
        allTodos: () => {
            return todosList;
        },
        todo: (root, { todoId }) => {
            return todosList.filter(todo => {
                return todo.id === todoId;
            })[0];
        }
    },
    Mutation: {
        addTodo: (root, { todoItem }) => {
            var newTodo = {
                id:todosList.length + 1,
                completed:false,
                todoItem
            }
            todosList.push(newTodo);        
            return todosList;
        },
        updateTodo: (root, { todoId }) => {
            var index = todosList.findIndex(x => x.id === todoId);
            var element = todosList[index];
            todosList[index].completed = true;           
            return todosList;
        },
        removeTodo: (root, { todoId }) => {
            todosList.splice(todosList.findIndex(x => x.id === todoId), 1);            
            return todosList;
        }
    }
}


export default resolvers;