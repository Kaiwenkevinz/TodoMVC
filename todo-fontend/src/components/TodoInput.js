import React, {useState} from 'react';
import TodoList from './TodoList';
import axios from 'axios';
import {authHeader} from '../_helpers';
import { Link } from 'react-router-dom';

const TodoInput = () => {
    const [todoName,
        setTodo] = useState('');

    const addTodo = (todo) => {
        let data = JSON.stringify({name: todo.name, complete: todo.complete});

        axios.post('http://localhost:3001/api/todos', data, {
            headers: {
                Authorization: authHeader()["Authorization"],
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload()
        })

    }

    const onChange = (event) => {
        setTodo(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (todoName.trim() === '') {
            return;
        }

        addTodo({name: todoName, complete: false});
        setTodo('');
    };

    return (
        <div>

            <form onSubmit={onSubmit}>

                <div className="input-field inline">
                    <input
                        id="text"
                        type="text"
                        className="validate"
                        name="todo"
                        value={todoName}
                        onChange={onChange}/>
                    <label htmlFor="text">点击这里创建新Todo</label>
                </div>

                <button type="submit" className="btn-floating waves-effect waves-light red">
                    <i className="material-icons">add</i>
                </button>

            </form>
            <TodoList/>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
};

export default TodoInput;