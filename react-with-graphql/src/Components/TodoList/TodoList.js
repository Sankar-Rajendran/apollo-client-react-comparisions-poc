import React from 'react';
import { Query, Mutation } from "react-apollo";

import { GET_ALLTODOS, REMOVE_TODO, UPDATE_TODO } from '../../queries';

import './TodoList.css';

import gql from "graphql-tag";




const updateCache = (cache, { data: { removeTodo } }) => {
    //If you want to concat the array , use below line to get current cache data 
    //cancat with new return data.
    //As we have written our server query to return all the todos ,
    // we can simply assign the new one to old cache object
    //const { todos } = cache.readQuery({ query: allTodos });
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { allTodos: removeTodo }
    });
}




const TodoList = () => (
    <Query
        query={gql`
        query {
            allTodos{
                id , 
                todoItem , 
                completed
            }      
        }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return (
                <div className="completed-list">
                    <div className="todo-pending">
                        {data.allTodos.filter(todo => todo.completed === false).map(function (todo, index) {
                            return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                                <Mutation mutation={UPDATE_TODO}>
                                    {
                                        updateTodo => <input className="complete-checkbox" type="checkbox" checked={false}
                                            onClick={() => { updateTodo({ variables: { todoId: todo.id } }); }} />
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
                </div>
            )
        }}
    </Query>
);


export default TodoList;