
let todosList = [
    { id: 1, todoTitle: "Todo 1", completed: true },
    { id: 2, todoTitle: "Todo 2", completed: false }
]

let initialState = {
    todoList: [...todosList],
};

const updateTodo = (todosList, id) => {
    var todos = [...todosList];
    var indexOfItem = todos.findIndex(todo => todo.id === id);
    todos[indexOfItem].completed = true;
    return todos;
}

const addNewTodo = (todos) => {
    return todos;
}

const removeTodo = (todosList, id) => {
    var todos = [...todosList];
    var indexOfItem = todos.findIndex(todo => todo.id === id);
    todos.splice(indexOfItem, 1);
    return todos;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todoList: addNewTodo(action.payload)
            }
        case "UPDATE_TODO":
            return {
                ...state,
                todoList: updateTodo(state.todoList, action.payload)
            }

        case "REMOVE_TODO":
            return {
                ...state,
                todoList: removeTodo(state.todoList, action.payload)
            }
        default:
            return state;
    }
}
