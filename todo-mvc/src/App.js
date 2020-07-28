import React from 'react';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

// Custom Components
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const persistedState = localStorage.getItem('todos-redux-state')
    ? JSON.parse(localStorage.getItem('todos-reduxState'))
    : {}

const store = createStore(rootReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    localStorage.setItem('todos-reduxState', JSON.stringify(store.getState()))
})

const App = () => (
    <Provider store={store}>
        <div className="main">
            <TodoInput/>
            <TodoList/>
        </div>
    </Provider>
);

export default App;