import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import './Todos-List.css';

class TodoList extends Component {

    state = {
        todoList: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoList: nextProps.todoList
        });
    }


    componentWillMount() {
        this.setState({ todoList: this.props.todoList });
    }

    updateTodo = (todoId) => {
        this.props.updateTodo(todoId)
    }

    deleteTodo = (todoId) => {
        this.props.deleteTodo(todoId)
    }


    render() {
        let todoList = this.state.todoList || this.props.todoList;
        let pendingList = todoList.filter(todo => todo.completed === false);
        let completedList = todoList.filter(todo => todo.completed === true);

        return (<div className="completed-list">
            <div className="todo-pending">
                {pendingList.map(function (todo, index) {
                    return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                        <input className="complete-checkbox" type="checkbox" checked={false} onChange={() => this.updateTodo(todo.id)} />
                        <span className="todo-item-label"> {todo.todoTitle} </span>
                        <span onClick={() => this.deleteTodo(todo.id)} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </div>);
                }, this)}
            </div>


            <div className="todo-completed">
                {completedList.map(function (todo, index) {
                    return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                        <input className="complete-checkbox" type="checkbox" checked="checked" readOnly />
                        <span className="todo-item-label"> {todo.todoTitle} </span>
                        <span onClick={() => this.deleteTodo(todo.id)} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </div>);
                }, this)}
            </div>
        </div>)
    }


}

const _TodoList = connect(
    state => ({ todoList: [...state.todoList.todoList] }),
    dispatch => bindActionCreators({ ...Actions }, dispatch),
)(TodoList);



export { _TodoList as TodoList };