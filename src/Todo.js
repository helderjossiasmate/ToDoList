import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <label>
            <p><input className="checkbox" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}</p>
        </label>
    )
}
