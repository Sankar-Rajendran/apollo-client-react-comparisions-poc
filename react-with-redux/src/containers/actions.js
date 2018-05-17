export function addTodo(todo) {
    return (dispatch) => {
        dispatch({
            type: "ADD_TODO",
            payload: todo
        })
    }
}


export function updateTodo(id) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_TODO",
            payload: id
        })
    }
}


export function deleteTodo(id) {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_TODO",
            payload: id
        })
    }
}



