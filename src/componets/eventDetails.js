import React from 'react';

const EventDetails =({event, onClose, onEdit, onDelete}) => {
    if (!event) return null;

    return(
        <div className = "event-details">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong>{new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong>{event.time}</p>
            <p><strong>Notes:</strong>{event.note || "No notes specified"}</p>

            {/* Add buttons for edit*/}
            <button onClick={() => onEdit(event)}>Edit</button>

            {/* Add buttons for delete and adds confermation that the user wants to delete*/}
            <button onClick={() => {
                if (window.confirm('Are you sure you want to delete this event?')) {
                    onDelete(event.id);
                }
            }}>
                Delete
            </button>

        </div>
    )
}

export default EventDetails;