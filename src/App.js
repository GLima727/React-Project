import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_KEY2 = 'todoApp.checkedTodos'

function App() {
  const [todos, setTodos] = useState([])
  const [checkedTodos, setCheckedTodos] = useState([])

  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const storedCheckedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2))

    if (storedTodos) setTodos(storedTodos)
    if (storedCheckedTodos) setCheckedTodos(storedCheckedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(checkedTodos))
  }, [checkedTodos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const newCheckedTodos = [...checkedTodos]

    let  todo = newTodos.find(todo => todo.id === id)
    let index = newTodos.findIndex((todo => todo.id === id))

    if(todo === undefined) {

      todo = newCheckedTodos.find(todo => todo.id === id)
      index = newCheckedTodos.findIndex((todo => todo.id === id))
    }

    todo.complete = !todo.complete

    if(todo.complete === true) {
      newTodos.splice(index, 1);

      setTodos(newTodos)
      setCheckedTodos(newCheckedTodos => {return [...newCheckedTodos, todo] });

    }
    else {

      newCheckedTodos.splice(index, 1);
      setTodos(prev => {
        return [...prev, todo]
      });
      setCheckedTodos(newCheckedTodos)
    }

  }
function handleClearAllTodos(e){
  setCheckedTodos([])
  setTodos([])
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
/*     const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos) */

    setCheckedTodos([])
  }

  return (<>

    <div className="App">

      <header className="App-header">

        <div className="lists" id='toDoList'> 
          <div className='listTitle'>TASKS <br></br> <span style ={ {fontSize: '4.7vw',position:'relative', top:'-1.9vh'}} >TO DO</span></div>

          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>

        <div className="lists" id='doneList'> 
        <div className='listTitle'>TASKS <span style ={ {fontSize: '4.7vw',position:'relative', top:'-1.9vh'}}>COMPLETED</span></div>
           
          <TodoList todos={checkedTodos} toggleTodo={toggleTodo} />
        </div>

        <h1 className='title'>TASK MANAGER</h1>
          <input id="inputBar" ref={todoNameRef} type="text" />
          <div className='buttons'>
            <button id="addTodo" onClick={handleAddTodo}>Add Task</button>
            <button id="clearTodo" onClick={handleClearTodos}>Clear Completed</button>

          </div>
          <div id="leftTodo">{todos.filter(todo => !todo.complete).length} left to do</div>
          <button id="clearAll" onClick={handleClearAllTodos}>Clear All Tasks</button>
      </header>
    </div>
    </>
  )
}

export default App;
