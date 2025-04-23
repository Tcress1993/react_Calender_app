import React, {useState, useEffect} from 'react'
import './eventForm.css'
import { set } from 'date-fns';

const EventForm = ({event, date, onSave, onCancel}) => {
    const [title, setTitle] = useState(event ? event.title: '');
    const [time, setTime] = useState(event ? event.time: '');
    const [note, setNote] = useState(event ? event.note: '');
    const [location, setLocation] = useState(event ? event.location: '');
    const [repeat, setRepeat] = useState(event ? event.repeat: "Never");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (event){
            //if the event is not null, set the title, time and note to the event values
            setTitle(event.title);
            setTime(event.time);
            setLocation(event.location);
            setRepeat(event.repeat);
            setNote(event.note);
        }else{
            setTitle('');
            setTime('');
            setNote('');
            setLocation('');
            setRepeat('Never');
        }
    }, [event]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !time) {
            setError('Please provide title and time.');
            return;
        }
        const newEvent = {
            title,
            time,
            note,
            location,
            repeat,
            date: date.toISOString(),
        };
        onSave(newEvent);
    }

    return(
        <div className = "event-form">
            <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Repeat</label>
                    <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
                        <option value="Never">Never</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Notes</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                </div>
                <button type="submit">{event ? 'Update' : 'Add'} Event</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )

}

export default EventForm;