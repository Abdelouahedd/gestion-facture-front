import React, {lazy} from 'react'
import {Route, Switch} from "react-router-dom";

const MainS = lazy(() => import("../component/main/Main"));
const ClientList = lazy(() => import("../component/clients/client-list/ClientList"));
const InvoiceList = lazy(() => import("../component/invoices/invoice-list/InvoiceList"));

export default function Routes() {

  return (
    <Switch>
      <Route path='/' component={MainS} exact/>
      <Route path='/list-client' component={ClientList} exact/>
      <Route path='/list-facture' component={InvoiceList} exact/>
    </Switch>
  )
}
