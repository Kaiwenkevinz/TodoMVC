import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

const {v4: uuidv4} = require('uuid');

const TodoInput = () => {
    const [todoName, setTodo] = useState('');

    const dispatch = useDispatch();

    const addTodo = (todo) => {
        dispatch(
            {
                type: 'ADD_TODO',
                payload: todo
            }
        )
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
            <div className="form-div">
                <input
                    type="text"
                    name="todo"
                    placeholder="Add a todo"
                    value={todoName}
                    onChange={onChange}/>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default TodoInput;