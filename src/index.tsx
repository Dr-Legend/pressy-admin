import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Container } from 'inversify';
import { ApiServiceBinder } from './client/ApiServiceBinder';
import { createStore, applyMiddleware } from "redux";
import { appReducer } from "./reducers/app-reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

let container = new Container();
let store = createStore(appReducer, applyMiddleware(thunk.withExtraArgument(container)));
ApiServiceBinder.with(container);

ReactDOM.render(
  <Provider
    store={store}>
    <App container={container} />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
