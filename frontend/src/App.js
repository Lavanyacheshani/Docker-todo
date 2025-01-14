import React, { useState, useEffect } from 'react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:5000/todos');
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async () => {
        const response = await fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task }),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setTask('');
    };

    const toggleTodo = async (id, completed) => {
        await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed }),
        });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
        fetchTodos();
    };

    return (
        <div>
            <h1>To-Do App</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            onClick={() => toggleTodo(todo._id, todo.completed)}
                        >
                            {todo.task}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
