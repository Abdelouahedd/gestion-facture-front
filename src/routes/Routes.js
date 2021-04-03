import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom";

const MainS = lazy(() => import("../component/main/Main"));

export default function Routes() {

    return (
        <Switch>
            <Route path='/' component={MainS} exact />
        </Switch>
    )
}
