import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const TodoList = () => {
    const todoList = useSelector((state) => state.todos.todoList);
    const isMouseInside = useSelector((state) => state.isMouseInside);

    console.log(isMouseInside)
    const dispatch = useDispatch();

    const deleteTodo = (todoId) => {
        dispatch({type: 'DELETE_TODO', payload: todoId})
    }

    const toggleTodo = (todoId) => {
        dispatch({type: 'TOGGLE_TODO', payload: todoId})
    }

    return (
        <div>
            <div className="card">
                <ul className="collection">
                    {todoList.map((todo) => (
                        <li key={todo.id} className="collection-item" onClick={toggleTodo.bind(null, todo.id)}>
                            <input type="checkbox" checked={todo.complete} className="filled-in" onChange={e => {}}/>
                            <span
                                className={todo.complete
                                ? 'complete'
                                : null}
                                >{todo.name}</span>
                            <span className="delete-button" onClick={deleteTodo.bind(null, todo.id)}>
                                删除
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default TodoList;