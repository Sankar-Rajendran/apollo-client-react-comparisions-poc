import React from 'react';
import { Query, Mutation } from "react-apollo";

import { GET_ALLTODOS, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO } from '../../queries';

import './TodoList.css';

import gql from "graphql-tag";


let unsubscribe = null;

const subscribed = () => {
    this.props.sub
}



const updateCache = (cache, { data: { removeTodo } }) => {
    //If you want to concat the array , use below line to get current cache data 
    //cancat with new return data.
    //As I have written our server query to return all the todos ,
    // I can simply assign the new one to old cache object
    //const { todos } = cache.readQuery({ query: allTodos });
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { allTodos: removeTodo }
    });
}


const TodoList = () => (
    <Query
        query={GET_ALLTODOS}
    >
        {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;


            return (
                <div className="completed-list">
                    <div className="todo-pending">
                        {data.allTodos.filter(todo => todo.completed === false).map(function (todo, index) {
                            return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                                <Mutation mutation={UPDATE_TODO}>
                                    {
                                        updateTodo => <input className="complete-checkbox" type="checkbox"
                                            checked={false} onClick={() => { updateTodo({ variables: { todoId: todo.id } }); }} />
                                    }
                                </Mutation>
                                <span className="todo-item-label"> {todo.todoItem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        removeTodo => <span onClick={() => { removeTodo({ variables: { todoId: todo.id } }); }} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                                    }
                                </Mutation>
                            </div>);
                        }, this)}
                    </div>

                    <div className="todo-completed">
                        {data.allTodos.filter(todo => todo.completed === true).map(function (todo, index) {
                            return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                                <input className="complete-checkbox" type="checkbox" checked="checked" readOnly />
                                <span className="todo-item-label"> {todo.todoItem} </span>
                                <Mutation mutation={REMOVE_TODO} update={updateCache}>
                                    {
                                        removeTodo => <span onClick={() => { removeTodo({ variables: { todoId: todo.id } }); }} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                                    }
                                </Mutation>
                            </div>);
                        }, this)}
                    </div>
                    <button onClick={() => {
                        unsubscribe = subscribeToMore({
                            document: SUBSCRIBE_NEWTODO,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const { todo } = subscriptionData.data.notifyUsers;
                                return {
                                    ...prev,
                                    allTodos: [...prev.allTodos, todo]
                                };
                            }
                        });

                    }} className="add-button">Subscribe for New data</button>
                    <button onClick={() => unsubscribe()} className="add-button">UnSubscribe</button>


                </div>
            )
        }}
    </Query>
);


export default TodoList;

