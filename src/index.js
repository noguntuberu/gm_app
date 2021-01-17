import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import app_store from './store/_store';
import App from './app/app';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './assets/css/text.css';

window.app_root = __dirname;

ReactDOM.render(
  <React.StrictMode>
      <Provider store={app_store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
