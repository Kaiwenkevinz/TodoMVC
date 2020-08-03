import React, { useEffect } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

// Custom Components
import TodoInput from './components/TodoInput';

// https://jasonwatmore.com/post/2020/03/02/react-hooks-redux-user-registration-and-login-tutorial-example
import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

// Create Store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="main">
            {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>
}
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={TodoInput}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;