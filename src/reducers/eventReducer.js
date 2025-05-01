import constant from '../constant/actionTypes';

const initialState = {events: []};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.FETCH_EVENTS:
            return {
                ...state,
                events: action.EVENTS
            };
        case constant.ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.EVENT]
            };
        case constant.DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.EVENT.id)
            };
        case constant.UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map(event => event.id === action.EVENT.id ? action.EVENT : event)
            };
        default:
            return state;
    }

}

export default eventReducer;