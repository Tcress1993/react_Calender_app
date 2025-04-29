import React, {useState} from 'react';

const TodoList = ({todos, onAdd, onEdit, onComplete}) => {
    //only get the todo items that are not completed
    const todoList = todos.filter(todos => todos.completed === false);

    return(
        <div className = "todo-list">
            <h3>Todo List</h3>
            {/*add a text field for the user to interact with*/}
            <input type="text" 
            placeholder="Add a new task!" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleAddTodo} 
            className = "add task"
            />
            {todoList.lenght === 0 ? (
                <p>All Task Completed</p>
            ):(
                <ul>
                    {todoList.map((todo) =>(
                        <li key = {todo._id} className = "todo-task">
                            {/*add editing derectly on the list*/}
                            <input
                                type ="text"
                                value = {editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onBlur={(e) => handleEditTodo(e, todo._id)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}