
const {v4: uuidv4} = require('uuid');
const initialState = {
    todoList: [
        {
            id: uuidv4(),
            name: '我是一个已完成的Todo',
            complete: true
        }, {
            id: uuidv4(),
            name: '点我试一试',
            complete: false
        }
    ]
};

const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    action.payload
                ]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todoList: state
                    .todoList
                    .map((todo) => (todo.id === action.payload)
                        ? {
                            ...todo,
                            complete: !todo.complete
                        }
                        : todo)
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todoList: state
                    .todoList
                    .filter((todo) => (todo.id !== action.payload))
            };
        default:
            return state;
    }
}

export default todoReducer