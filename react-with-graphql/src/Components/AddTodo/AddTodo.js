import React from 'react';
import { Mutation } from "react-apollo";
import { GET_ALLTODOS, ADD_TODO } from '../../queries';

import './AddTodo.css';

let input;

const updateCache = (cache, { data: { addTodo } }) => {
    //If you want to concat the array , use below line to get current cache data 
    //cancat with new return data.
    //As we have written our server query to return all the todos ,
    // we can simply assign the new one to old cache object
    //const { todos } = cache.readQuery({ query: allTodos });
    cache.writeQuery({
        query: GET_ALLTODOS,
        data: { allTodos: addTodo }
    });
    input.value = '';
}



const AddTodo = () => {
    return (
        <Mutation mutation={ADD_TODO} update={updateCache} >
            {(addTodo, { data }) => (
                <div className="addTodo">
                    <div className="row">
                        <p className="label">Add New Todo</p>
                        <input ref={node => { input = node; }} />
                        <button className="add-button" onClick={() => { addTodo({ variables: { todoItem: input.value } }); }}>Add</button>

                    </div>
                </div>
            )}
        </Mutation>
    );
};


export default AddTodo;