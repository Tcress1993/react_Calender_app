import actionTypes from  '../constants/actionTypes';

const env = process.env;

function todosFetched(todos){
    return{
        type: actionTypes.FETCH_TODOS,
        todos: todos
    }
}

function todoSet(todo){
    return{
        type: actionTypes.SET_TODO,
        selectedTodo: todo
    }
}

export function fetchTodos(){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/todos`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(todosFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function setTodo(todo){
    return dispatch =>{
        dispatch(todoSet(todo));
    }
}

export function addTodo(todo){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/todos`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(fetchTodos());
        }).catch((e) => console.log(e));
    }
}

export function deleteTodo(id){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/todos/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(fetchTodos());
        }).catch((e) => console.log(e));
    }
}   

export function updateTodo(todo){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/todos/${todo._id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(todo),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(fetchTodos());
        }).catch((e) => console.log(e));
    }
}




