import React, { lazy } from 'react'
import { Route, Switch } from "react-router-dom";

export default function Routes() {
    const MainS = lazy(() => import("../component/main/Main"));
    return (
        <Switch>
            <Route path='/' component={MainS} exact />
        </Switch>
    )
}
