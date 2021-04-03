import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from './helper/history'
import Login from "./component/login/Login";

const Unauthenticated = () => (
    <Router history={history} >
        <Switch>
            <Route path='/login' component={Login} />
        </Switch>
    </Router>
)
export default Unauthenticated
