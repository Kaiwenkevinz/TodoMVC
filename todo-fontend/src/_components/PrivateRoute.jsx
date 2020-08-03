import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <div>
        <Route
            {...rest}
                render={props => (localStorage.getItem('user')
            ? <Component {...props}/>
            : <Redirect
                to={{
                pathname: '/login',
                state: {
                    from: props.location
                }
            }}/>)}/>
    </div>
)

export default PrivateRoute;