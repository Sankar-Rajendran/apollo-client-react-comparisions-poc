var _ = require('lodash');

import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();

let todosList = [
    { id: '_kt20zuu0t', todoItem: "Todo 1", completed: true },
    { id: '_tt20zuu0t', todoItem: "Todo 2", completed: false }
]

const TODO_ADDED = 'TODO_ADDED';
const TODO_REMOVED = 'TODO_REMOVED';
const TODO_UPDATED = 'TODO_UPDATED';

const resolvers = {
    Subscription: {
        notifyUsers: {
            subscribe: () => pubsub.asyncIterator([TODO_ADDED]),
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
                id: '_' + Math.random().toString(36).substr(2, 9),
                completed: false,
                todoItem
            }
            todosList.push(newTodo);
            let Message = { message: 'New todo has been added', todo: newTodo };
            pubsub.publish(TODO_ADDED, { notifyUsers: Message });
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