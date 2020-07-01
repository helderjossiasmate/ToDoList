import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';
import './App.css';
import {FiDelete, FiPlusCircle} from 'react-icons/fi';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1 className="logo">Todo list</h1>
      <div className="todoInputs">
        <div className="inputs">
          <input className="textBox" placeholder="..." ref={todoNameRef} type="text" />
          <button className="add" onClick={handleAddTodo}><FiPlusCircle /> Add Todo</button>
          <button className="clear" onClick={handleClearTodo}><FiDelete /> Clear completed todos</button>
        </div>
      </div>
      
      <div className="todosOutput">
          <div className="todos">
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <i><b>You have {todos.filter(todo => !todo.complete).length} left todos to complete</b></i>
          </div>
      </div>
    </div>
  );
}

export default App;
