import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom";

const MainS = lazy(() => import("../component/main/Main"));
const ClientList = lazy(() => import("../component/clients/client-list/ClientList"));

export default function Routes() {

    return (
        <Switch>
            <Route path='/' component={MainS} exact />
            <Route path='/list-client' component={ClientList} exact />
        </Switch>
    )
}
