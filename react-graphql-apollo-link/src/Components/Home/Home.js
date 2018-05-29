import React, { Component } from 'react';
import './Home.css';

import  AddTodo  from '../AddTodo/AddTodo'
import  TodoList  from '../TodoList/TodoList';

class Home extends Component {
    
    render() {
        return (
            <div className="home">
                <div className="title shadow-sm p-3 mb-5 bg-white rounded">
                    TODO APP
                </div>
                <AddTodo/>
                <TodoList />
            </div>
        )
    }
}


export default Home;

