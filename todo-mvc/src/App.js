import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

// Custom Components
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


const store = createStore(
  rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const App = () => (
  <Provider store={store}>
    <div className="main">
      <TodoInput />
      <TodoList />
    </div>
  </Provider>
);

export default App;