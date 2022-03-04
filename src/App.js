import React, {useState, useRef, useEffect} from "react"; /*Import {useState} to use states // useRef allow us to reference things in our html */
/*Things inside the {} are hooks */
import TodoList from "./TodoList";
import {v4 as uuidv4} from 'uuid'; /* random number */

const LOCAL_STORAGE_KEY = "DATA"

function App() {
  const [todos, setTodos] = useState([]) /* Destructure  */
  const todoNameRef = useRef() /*Get reference to the element */

  useEffect(() => { /*The first parameter is the function we want to do things with,
     When the second argument changes the function is called*/
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []) /* As an empty array never changes, only is called at the start  */

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos] ) /* Every time the "todos" array changes, it is stored */

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) { /* e from "event"*/
    const name = todoNameRef.current.value /* From the current element get the value */
    if (name === "") return
    setTodos(prevTodos => { /*Take the prevous array and do something */
      return [...prevTodos, { id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value = null /* Clears the value once is added, QofLife feature */
  }
  
  function handleClearTodo(){
    const newList = todos.filter(el => !el.complete)
    setTodos(newList)

  }

  return (
    <div>
     <TodoList todos={todos} toggleTodo ={toggleTodo}/>
      <input ref={todoNameRef} type="text"></input>
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodo}>Clear completed</button>
      <div>{todos.filter(el => !el.complete).length} left to do</div>
    </div>
  )
}



export default App;
