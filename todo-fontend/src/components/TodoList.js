import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {authHeader} from '../_helpers'

const API_URL = 'http://localhost:3001';

function TodoList() {
    const [items,
        setItems] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/api/todos',
            headers: {
                Authorization: authHeader()["Authorization"]
            }
        }).then((res) => {
            setItems(res.data.todos)
        })
    }, [setItems]);

    const deleteTodo = (todoId) => {
        axios
            .delete(`http://localhost:3001/api/todos/${todoId}`, {
            headers: {
                Authorization: authHeader()["Authorization"]
            }
        })
            .then((res) => {
                setItems(items.filter((item) => {
                    return item._id !== todoId
                }))
            })
            .catch(err => console.log(err));
    }

    const toggleTodo = (todo) => {
        let data = JSON.stringify({
            _id: todo._id,
            name: todo.name,
            complete: !todo.complete
        });

        axios.post('http://localhost:3001/api/todo', data, {
            headers: {
                Authorization: authHeader()["Authorization"],
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data.todo._id);
            setItems(items.map((todo) => {
                return (todo._id === res.data.todo._id)
                    ? {
                        ...todo,
                        complete: res.data.todo.complete
                    }
                    : todo
            }))
        })
    }

    return (
        <div>
            <div className="card">
                <ul className="collection">
                    {items.map((todo) => (
                        <li key={todo._id} className="collection-item">
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                className="filled-in"
                                onChange={toggleTodo.bind(null, todo)}/>
                            <span
                                className={todo.complete
                                ? 'complete'
                                : null}
                                onClick={toggleTodo.bind(null, todo)}>{todo.name}
                            </span>
                            <span className="delete-button" onClick={deleteTodo.bind(null, todo._id)}>
                                删除
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default TodoList;