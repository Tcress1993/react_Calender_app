import React, {useState, useEffect} from 'react';
import './calendar.css';
import EventDetails from './eventDetails';
import EventForm from './eventForm';

import * as eventActions from '../actions/eventAction';


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
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
        const fetchEvents = async () => {
            setLoading(true);
            try {
                await eventActions.fetchEvents()({
                    dispatch: (action) => {
                        if (action.type === 'FETCH_EVENTS') {
                            setEvents(action.EVENTS);
                        }
                    },
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [currentMonth, currentYear]);

    

    //add and event to the calender
    const addEvent = async (event) =>{
        try{
            await eventActions.addEvent(event)({
                dispatch: (action) => {
                    if (action.type === 'ADD_EVENT') {
                        setEvents(action.EVENTS);
                        setSelectedDay(null);
                    }
                },
            });
                }catch(err){
                    setError(err.message);
                }
        };
    //edit an event in the calender
    const editEvent = async (event) => {
        try{
            await eventActions.updateEvent(event)({
                dispatch: (action) =>{
                    if (action.type === 'UPDATE_EVENT'){
                        setEvents(action.EVENTS);
                        setEventToEdit(null);
                    }
                },
            });
        }catch(err){
            setError(err.message);
        }
    };

    //delete an event from the calender
    const deleteEvent = async (eventId) => {
        try{
            await eventActions.deleteEvent(eventId)({
                dispatch: (action) => {
                    if (action.type === 'DELETE_EVENT') {
                        setEvents(action.EVENTS);
                        setSelectedEvent(null);
                    }
                },
            });
        }catch(err){
            setError(err.message);
        }
    };

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
    

    const handleEditEvent = (event) =>{
        setEventToEdit(event);
        setShowEventForm(true);
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
            {/*uses eventDetails.js when an event is selected*/}
            {selectedEvent && (
                <EventDetails
                    event = {selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEdit={handleEditEvent}
                    onDelete={deleteEvent}
                    onSave={editEvent}
                    onCancel={() => setSelectedEvent(null)}
                />
            )}
            {/*uses eventForm.js when the add event button is clicked*/}
            {selectedDay && !eventToEdit &&(
                <EventForm
                    date = {selectedDay}
                    month = {currentMonth +1}
                    year={currentYear}
                    onClose={() => setSelectedDay(null)}
                    onSave={addEvent}
                    onCancel={() => setSelectedDay(null)}
                    />
            )}

            
        </div>
    );
}
export default Calendar;