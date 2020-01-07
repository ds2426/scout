import React from "react";
import { ToastProvider } from 'react-toast-notifications';
import { Switch, Route } from "react-router-dom";
import Homepage from "../homepage";
import Header from "../header";
import Product from "../product";
import Bin from "../bin";
import Inventory from '../inventory';
import Order from '../order';
import OrderLines from '../order-line';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import "./app.scss";

export const App = () => {

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <ToastProvider placement="top-right">
      <ApolloProvider client={client}>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/bins" component={Bin} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/lines" component={OrderLines} />
        </Switch>
      </ApolloProvider>
    </ToastProvider>
  );
}

export default App;