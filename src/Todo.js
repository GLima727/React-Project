import React from 'react'
import './Todo.css';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div className='tasks'>
      <label>
        <input type="checkbox" class="checkbox-effect checkbox-effect-4" id="get-up-4" value="get-up-4" name="get-up-4" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label>
    </div>
  )
}
