import React, { useState, useEffect } from 'react';
import './calendar.css';
import EventDetails from './eventDetails';
import EventForm from './eventForm';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../actions/eventAction';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const state = useSelector((state)=> state);
    console.log(state);
    const events = useSelector((state) => state.event.events.events); // Use Redux state for events
    console.log(events);

    const today = new Date();

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const startDay = firstDay;

    const days = [];
    for (let i = 1; i <= lastDate; i++) {
        days.push(i);
    }

    useEffect(() => {
        console.log(currentMonth + 1, currentYear);
        dispatch(eventActions.fetchEvents(currentMonth + 1, currentYear));
    }, [dispatch, currentMonth, currentYear]);

    const addEvent = async (event) => {
        try {
            await dispatch(eventActions.addEvent(event));
            setSelectedDay(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const editEvent = async (event) => {
        try {
            await dispatch(eventActions.updateEvent(event));
            setEventToEdit(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await dispatch(eventActions.deleteEvent(eventId));
            setSelectedEvent(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleDayClick = (day) => {
        const fullDate = new Date(currentYear, currentMonth, day);
        setSelectedDay(fullDate);
    };

    const handleEditEvent = (event) => {
        setEventToEdit(event);
        setShowEventForm(true);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>Previous</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
                </h2>
                <button onClick={nextMonth}>Next</button>
            </div>

            <div className="calendar-grid">
                {Array.from({ length: startDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="calendar-day empty"></div>
                ))}
                {days.map((day) => (
                    <div
                        key={day}
                        className={`calendar-day ${
                            today.getDate() === day &&
                            today.getMonth() === currentMonth &&
                            today.getFullYear() === currentYear
                                ? 'today'
                                : ''
                        }`}
                        onClick={() => handleDayClick(day)}
                    >
                        <span className="day-number">{day}</span>
                        {events && events.length > 0 &&
                            events
                                .filter((event) => new Date(event.date).getDate() === day)
                                .map((event) => (
                                    <div
                                        key={event.id}
                                        className="event"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedEvent(event);
                                        }}
                                    >
                                        {event.title} - {event.time}
                                    </div>
                                ))}
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <EventDetails
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEdit={handleEditEvent}
                    onDelete={deleteEvent(selectedEvent._id)}
                    onSave={editEvent}
                    onCancel={() => setSelectedEvent(null)}
                />
            )}

            {selectedDay && !eventToEdit && (
                <EventForm
                    date={selectedDay}
                    month={currentMonth + 1}
                    year={currentYear}
                    onClose={() => setSelectedDay(null)}
                    onSave={addEvent}
                    onCancel={() => setSelectedDay(null)}
                />
            )}
        </div>
    );
};

export default Calendar;