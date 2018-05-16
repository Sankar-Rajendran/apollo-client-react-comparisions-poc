import React, { Component } from 'react';

import './AddTodo.css';

class addTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle: "",
            completed: false
        }
    }

    update = (e) => {
        this.setState({ todoTitle: e.target.value });
    };

    addClicked = () => {
        this.props.addClicked(this.state);
        this.setState({ todoTitle: ''});
    }

    render() {
        return (
            <div className="addTodo">
                <div className="row">
                    <p className="label">Add New Todo</p>
                    <input value={this.state.todoTitle} className="input-text" type="text" onChange={this.update} />
                    <button className="add-button" onClick={this.addClicked}>Add</button>
                </div>
            </div>

        )
    }
}


export default addTodo;