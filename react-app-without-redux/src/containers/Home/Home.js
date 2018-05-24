import React, { Component } from 'react';

import './Home.css'

import AddTodo from '../../components/AddTodo/AddTodo';
import TodoList from '../../components/Todos-List/Todos-List';

class Home extends Component {

    state = {
        todos: [
            { id: '_kt20zuu0t', todoItem: "Todo 1", completed: true },
            { id: '_tt20zuu0t', todoItem: "Todo 2", completed: false }
        ]
    }

    addNewTodo = (newTodo) => {
        var todosCopy = this.state.todos;
        newTodo.id = '_' + Math.random().toString(36).substr(2, 9);
        todosCopy.push(newTodo);
        this.setState({ todos: todosCopy });
    }



    changeTodo = (id) => {
        var todosCopy = this.state.todos;
        var indexOfItem = todosCopy.findIndex(todo => todo.id === id);
        todosCopy[indexOfItem].completed = true;
        this.setState({ todos: todosCopy });
    }


    removeTodo = (id) => {
        var todosCopy = this.state.todos;
        var indexOfItem = todosCopy.findIndex(todo => todo.id === id);
        todosCopy.splice(indexOfItem, 1);
        this.setState({ todos: todosCopy });
    }

    render() {
        return (
            <div className="home">
                <div className="title shadow-sm p-3 mb-5 bg-white rounded">
                    TODO APP
                </div>
                <AddTodo addClicked={this.addNewTodo} />
                <TodoList deleteClicked={this.removeTodo} todos={this.state.todos} changeClicked={this.changeTodo}></TodoList>
            </div>

        )
    }
}



export default Home;