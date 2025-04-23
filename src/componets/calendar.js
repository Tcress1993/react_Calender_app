import React, {useState, useEffect} from 'react';
import './calendar.css';
import EventDetails from './eventDetails';
import EventForm from './eventForm';
import TodoList from './todoList';
import * as eventActions from '../action/eventAction';
import * as todoActions from '../action/todoAction';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [todos, setTodos] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showTodoList, setShowTodoList] = useState(false);
    const today = new Date();

    //get the current monght and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    //get the first day and the last day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    //get the day of the week the month starts
    const startDay = firstDay;

    //get an array of days for the month
    const days = [];
    for (let i =1; i<= lastDate; i++){
        days.push(i);
    }

    //get the events for the current month
    useEffect(() => {
        setLoading(true);
        eventActions.fetchEvents()({
            dispatch: (action) => {
                if (action.type === 'FETCH_EVENTS') {
                    setEvents(action.EVENT);
                    setLoading(false);
                }
            }
        })
        
    },[currentMonth, currentYear]);

    //get the events for the current day
    useEffect(() => {
        if(selectedDay){
            eventActions.fetchEvents()({
                dispatch: (action) => {
                    if (action.type === 'FETCH_EVENTS') {
                        setEvents(action.EVENT.filter(event => new Date(event.date).getDate() === selectedDay));
                    }
                }
            })
        }
    }, [selectedDay]);


    //get the events for the current todo list
    useEffect(() => {
        setLoading(true);
        todoActions.fetchTodos()({
            dispatch: (action) => {
                if (action.type === 'FETCH_TODOS') {
                    setTodos(action.TODOS);
                    setLoading(false);
                }
            }
        })
    },[]);

    //delete the event from the calendar
    const deleteEvent = (eventId) =>{
        eventActions.deleteEvent(eventId)({
            dispatch: (action) =>{
                if (action.type === 'DELETE_EVENT'){
                    setEvents(action.EVENTS);
                    setSelectedEvent(null);
                }
            }
    });
    }

    //add the event to the calendar
    const addEvent = (event) => {
        eventActions.addEvent(event)({
            dispatch: (action) =>{
                if (action.type === 'ADD_EVENT'){
                    setEvents(action.EVENTS);
                    setSelectedDay(null);
                }
            }
        });
    }

    //edit the event in the calendar
    const editEvent = (event) => {
        eventActions.updateEvent(event)({
            dispatch: (action) =>{
                if (action.type === 'EDIT_EVENT'){
                    setEvents(action.EVENTS);
                    setSelectedEvent(null);
                }
            }
        });

    }

    //add todo to the todo list
    const addTodo = (todo) => {
        todoActions.addTodo(todo)({
            dispatch: (action) =>{
                if (action.type === 'ADD_TODO'){
                    setTodos(action.TODOS);
                    setShowTodoList(false);
                }
            }  
        });
    }

    //edit todo in the todo list
    const editTodo = (todo) => {
        todoActions.updateTodo(todo)({
            dispatch: (action) =>{
                if (action.type === 'EDIT_TODO'){
                    setTodos(action.TODOS);
                    setShowTodoList(false);
                }
            }   
        });
    }

    //delete todo from the todo list
    const deleteTodo = (todoId) => {
        todoActions.deleteTodo(todoId)({
            dispatch: (action) =>{
                if (action.type === 'DELETE_TODO'){
                    setTodos(action.TODOS);
                    setShowTodoList(false);
                }
            }
        });
    }




    

    //logic to get the previous and next months
    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };
    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    //handle the click events 
    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };
    const handleTodoListClick = () => {
        setShowTodoList(true);
    }

    const handleEditEvent = (event) =>{
        setEventToEdit(event);
        setShowEventForm(true);
    }

    const handleDeleteEvent = async (eventId) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
        });
            if (!response.ok){
                throw Error(response.statusText);
            }
            const data = await response.json();
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            setSelectedEvent(null);

        }catch(err){
            setError(err.message);
        }
    }

    

    
           

    return (
        <div className = "calendar">
            <div className = "calendar-header">
                {/*create a previous button that will go the previous month*/}
                <button onClick = {prevMonth}>Previous</button>
                <h2>
                    {currentDate.toLocaleString('default', {month: 'long'})} {currentYear}
                </h2>
                <button onClick = {nextMonth}>Next</button>
                {/*create a button to view the todo list*/}
                <button onClick={handleTodoListClick}> Todo List</button>
            </div>

            {/*set up the calander as a grid*/}
            <div className = "calendar-grid">
                {/*sets empty cell to align the grid*/}
                {Array.from({length: startDay}).map((_, index) => (
                    <div key = {`empty-${index}`} className = "calendar-day empty"></div>
                ))}
                {/*set the days of the month*/}
                {days.map((day) => (
                    <div key={day}
                    className={`calendar-day ${today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear ? 'today' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    <span className="day-number">{day}</span>
                        {events .filter((event) => new Date(event.date). getDate() === day)
                        .map((event) => (
                            <div
                                    key={event.id}
                                    className="event"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the day click
                                        handleEventClick(event);
                                    }}
                                >
                                {event.title} - {event.time}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/*uses eventDetails.js when an envent is selected*/}
            {selectedEvent && (
                <EventDetails
                    event = {selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                />
            )}
            {/*uses eventForm.js when the add event button is clicked*/}
            {selectedDay && !eventToEdit &&(
                <EventForm
                    date = {selectedDay}
                    month = {currentMonth +1}
                    year={currentYear}
                    onclose={() => setSelectedDay(null)}
                    />
            )}

            {/*uses todoList.js when the todo list button is clicked*/}
            {showTodoList && (
                <TodoList onClose={() => setShowTodoList(false)} /> 
            )}
        </div>
    );
}
export default Calendar;