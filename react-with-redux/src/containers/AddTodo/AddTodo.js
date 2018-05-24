import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import './AddTodo.css';

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle: "",
            todoList: []
        }
    }

    componentWillMount() {
        this.setState({ todoList: this.props.todoList });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            todoList: nextProps.todoList
        });
    }

    update = (e) => {
        this.setState({ todoTitle: e.target.value });
    };

    addTodo = (newTodo) => {
        var todoList = [...this.state.todoList];
        newTodo.id = '_' + Math.random().toString(36).substr(2, 9);
        todoList.push({
            id: newTodo.id,
            todoItem: this.state.todoTitle,
            completed: false
        });
        this.props.addTodo(todoList);
        this.setState({ todoTitle: '' });
    }


    render() {
        return (
            <div className="addTodo">
                <div className="row">
                    <p className="label">Add New Todo</p>
                    <input value={this.state.todoTitle} className="input-text" type="text" onChange={this.update} />
                    <button className="add-button" onClick={this.addTodo}>Add</button>
                </div>
            </div>

        )
    }
}

const _AddTodo = connect(
    state => ({ todoList: [...state.todoList.todoList] }),
    dispatch => bindActionCreators({ ...Actions }, dispatch),
)(AddTodo);


export { _AddTodo as AddTodo };