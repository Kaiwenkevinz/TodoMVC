import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const TodoList = () => {
    const todoList = useSelector((state) => state.todos.todoList);
    const dispatch = useDispatch();

    const deleteTodo = (todoId) => {
        dispatch(
            {
                type: 'DELETE_TODO',
                payload: todoId
            }
        )
    }

    const toggleTodo = (todoId) => {
        dispatch(
            {
                type: 'TOGGLE_TODO',
                payload: todoId
            }
        )
    }

    return (
        <ul className="todo-list">
            {todoList.map((todo) => (
                <li key={todo.id}>
                    <input type="checkbox" checked={todo.complete}/>
                    <span
                        className={todo.complete
                        ? 'complete'
                        : null}
                        onClick={toggleTodo.bind(null, todo.id)}>{todo.name}</span>
                    <span className="delete-button" onClick={deleteTodo.bind(null, todo.id)}>
                        X
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;