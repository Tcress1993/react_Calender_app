import actionTypes from '../constants/actionTypes';


const env = process.env;

function eventsFetched(events){
    return{
        type: actionTypes.FETCH_EVENTS,
        EVENTS: events
    }
}

function eventFetched(event){
    return{
        type: actionTypes.FETCH_EVENT,
        EVENT: event
    }
}

function eventSet(event){
    return{
        type: actionTypes.SET_EVENT,
        EVENT: event
    }
}

export function setEvent(event){
    return dispatch =>{
        dispatch(eventSet(event));
    }
}

export function fetchEvent(eventId){
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/events/${eventId}`,{
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
            dispatch(eventFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function fetchEvents(currentMonth, currentYear){
    console.log("fetch is bing called");
    return dispatch =>{
        return fetch(`${process.env.REACT_APP_API_URL}/events?month=${currentMonth}&year=${currentYear}`,{
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
            console.log(`fetched events ${res}`)
            dispatch(eventsFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function addEvent(event){
    return dispatch =>{
        const token = localStorage.getItem('token');
        console.log(token);
        return fetch(`${env.REACT_APP_API_URL}/events`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(event),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(fetchEvents());
        }).catch((e) => console.log(e));
    }

}

export function deleteEvent(eventId){
    console.log(eventId);
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/events/${eventId}`,{
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
            dispatch(fetchEvents());
        }).catch((e) => console.log(e));
    }
}

export function updateEvent(eventId, event){
    console.log(eventId);
    return dispatch =>{
        return fetch(`${env.REACT_APP_API_URL}/events/${eventId}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(event),
            mode: 'cors'
        }).then((response) => {
            if (!response.ok){
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(fetchEvents());
        }).catch((e) => console.log(e));
    }
}

