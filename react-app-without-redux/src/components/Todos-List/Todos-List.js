import React, { Component } from 'react';

import './Todos-List.css';

class TodoList extends Component {
           
    render() {
        let pendingList = this.props.todos.filter(todo => todo.completed === false);
        let completedList = this.props.todos.filter(todo => todo.completed === true);

        return (<div className="completed-list">
            <div className="todo-pending">
                {pendingList.map(function (todo, index) {
                    return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                        <input className="complete-checkbox" type="checkbox" checked={false} onChange={() => this.props.changeClicked(todo.id)} />
                        <span className="todo-item-label"> {todo.todoTitle} </span>
                        <span  onClick={() => this.props.deleteClicked(todo.id)}  className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </div>);
                } , this)}
            </div>


            <div className="todo-completed">
                {completedList.map(function (todo, index) {
                    return (<div className="todo-item row shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                        <input className="complete-checkbox" type="checkbox" checked="checked" readOnly />
                        <span className="todo-item-label"> {todo.todoTitle} </span>
                        <span onClick={() => this.props.deleteClicked(todo.id)} className="delete-icon"><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </div>);
                },this)}
            </div>
        </div>)
    }


}


export default TodoList;