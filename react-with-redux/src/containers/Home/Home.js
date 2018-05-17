import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";


import './Home.css'

import { AddTodo } from '../AddTodo/AddTodo';
import { TodoList } from '../Todos-List/Todos-List';

class Home extends Component {

    state = {
        todoList: []
    }

    componentWillMount() {
        this.setState({ todoList: this.props.todoList });
    }

   

    render() {
        let todoList = this.state.todoList || this.props.todoList;
        console.log(todoList);
        return (
            <div className="home">
                <div className="title shadow-sm p-3 mb-5 bg-white rounded">
                    TODO APP
                </div>
                <AddTodo />
                <TodoList />
            </div>
        )
    }
}


const _TodoHome = connect(
    state => ({ todoList: [...state.todoList.todoList] }),
    dispatch => bindActionCreators({ ...Actions }, dispatch),
)(Home);



export { _TodoHome as Home };