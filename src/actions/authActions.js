import actionTypes from "../constants/actionTypes";

const env = process.env;

function userLoggedIn(username){
    return{
        type: actionTypes.USER_LOGGEDIN,
        USERNAME: username
    }
}

function logout(){
    return {
        type: actionTypes.USER_LOGGEDOUT
    }
}

export function submitLogin(data){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', res.token);
            dispatch(userLoggedIn(data.username));
        }).catch((e) => console.log(e));
    }
}

export function submitRegister(data){
    console.log(data);
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/signup`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(submitLogin(data));
        }).catch((e) => console.log(e));
    }
}

export function logoutUser(){
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}