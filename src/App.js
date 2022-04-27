import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (<>

    <div className="App">

      <header className="App-header">
        <h1 className='title'>TASK MANAGER</h1>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <input id="inputBar" ref={todoNameRef} type="text" />
          <div className='buttons'>
            <button id="addTodo" onClick={handleAddTodo}>Add Todo</button>
            <button id="clearTodo" onClick={handleClearTodos}>Clear Complete</button>
          </div>
          <div id="leftTodo">{todos.filter(todo => !todo.complete).length} left to do</div>
   
      </header>
    </div>
    </>
  )
}

export default App;
