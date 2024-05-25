import React, { useState, useEffect } from 'react';
import { getTodos, deleteTodo, addTodo } from '../api';
import AddTodo from './AddTodo';
import Todo from './Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useStateimport React, { useState, useEffect } from 'react';
import { getTodos, deleteTodo, addTodo } from '../api'; // Ensure this path is correct
import AddTodo from './AddTodo';
import Todo from './Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await getTodos();
        setTodos(response.data);
    };

    const handleAddTodo = async (newTodo) => {
        const response = await addTodo(newTodo);
        setTodos([...todos, response.data]);
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'ongoing') return todo.status === 'ongoing';
        return false;
    });

    return (
        <div>
            <AddTodo addTodo={handleAddTodo} />
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('ongoing')}>Ongoing</button>
            </div>
            {filteredTodos.map((todo) => (
                <Todo key={todo._id} todo={todo} deleteTodo={handleDeleteTodo} />
            ))}
        </div>
    );
};

export default TodoList;
('all');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await getTodos();
        setTodos(response.data);
    };

    const handleAddTodo = async (newTodo) => {
        const response = await addTodo(newTodo);
        setTodos([...todos, response.data]);
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'ongoing') return todo.status === 'ongoing';
        return false;
    });

    return (
        <div>
            <AddTodo addTodo={handleAddTodo} />
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('ongoing')}>Ongoing</button>
            </div>
            {filteredTodos.map((todo) => (
                <Todo key={todo._id} todo={todo} deleteTodo={handleDeleteTodo} />
            ))}
        </div>
    );
};

export default TodoList;
