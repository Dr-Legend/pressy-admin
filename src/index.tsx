import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Container } from 'inversify';
import { ApiServiceBinder } from './client/ApiServiceBinder';
import { IAPIConfiguration } from "./client/IAPIConfiguration";
import { TYPES } from "./client/variables";

let container = new Container();
// container.bind<IAPIConfiguration>(TYPES.IAPIConfiguration).toConstantValue({
//   apiKeys: {

//   }
// });
ApiServiceBinder.with(container);

ReactDOM.render(<App container={container} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
