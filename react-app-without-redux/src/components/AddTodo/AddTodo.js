import React, { Component } from 'react';

import './AddTodo.css';

class addTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoItem: "",
            completed: false
        }
    }

    update = (e) => {
        this.setState({ todoItem: e.target.value });
    };

    addClicked = () => {
        this.props.addClicked(this.state);
        this.setState({ todoItem: ''});
    }

    render() {
        return (
            <div className="addTodo">
                <div className="row">
                    <p className="label">Add New Todo</p>
                    <input value={this.state.todoItem} className="input-text" type="text" onChange={this.update} />
                    <button className="add-button" onClick={this.addClicked}>Add</button>
                </div>
            </div>

        )
    }
}


export default addTodo;