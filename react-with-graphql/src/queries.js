
import gql from "graphql-tag";

const GET_ALLTODOS = gql`
query {
    allTodos{
        id , 
        todoItem , 
        completed
    }
}`;



const ADD_TODO = gql`
mutation addTodo($todoItem: String!) {
    addTodo(todoItem:$todoItem){
		id , todoItem , completed
	}
    }
`;

const REMOVE_TODO = gql`
mutation removeTodo($todoId: String!) {
    removeTodo(todoId:$todoId){
		id , todoItem , completed
	}
}`;

const UPDATE_TODO = gql`
mutation updateTodo($todoId: String!) {
    updateTodo(todoId:$todoId){
		id , todoItem , completed
	}
}`;


const SUBSCRIBE_NEWTODO = gql`
subscription {
    notifyUsers {    
        message
        todo{
        id , todoItem , completed
        }
    }
}
`



export { GET_ALLTODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SUBSCRIBE_NEWTODO }

