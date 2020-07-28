import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

const {v4: uuidv4} = require('uuid');

const TodoInput = () => {
    const [todoName,
        setTodo] = useState('');

    const dispatch = useDispatch();

    const addTodo = (todo) => {
        dispatch({type: 'ADD_TODO', payload: todo})
    }

    const onChange = (event) => {
        setTodo(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (todoName.trim() === '') {
            return;
        }

        addTodo({id: uuidv4(), name: todoName, complete: false});
        setTodo('');
    };

    return (
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
    );
};

export default TodoInput;