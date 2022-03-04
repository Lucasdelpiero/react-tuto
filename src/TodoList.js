import React from 'react' /* rfc to create all this*/
import Todo from './Todo'


export default function TodoList({ todos, toggleTodo }) {
    return (
                todos.map(todo => {
                    return <Todo key={todo.id} toggleTodo={toggleTodo} todo ={todo}/>
                })
    )
}
