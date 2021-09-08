import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { icons } from './assets/icons';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'
React.icons = icons
ReactDOM.render(
  // <Provider store={store}>
    <React.StrictMode>
    <App/>
    </React.StrictMode>,
  /* </Provider>, */
  document.getElementById('root')
);
reportWebVitals();
// serviceWorker.unregister();
