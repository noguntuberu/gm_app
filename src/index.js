import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import app_store from './store/_store';
import App from './app/app';
import * as serviceWorker from './serviceWorker';
import './index.css';

/** COLORS */
import './assets/css/colors/black.css';
import './assets/css/colors/blue.css';
import './assets/css/colors/green.css';
import './assets/css/colors/purple.css';
import './assets/css/colors/wine.css';

/** COMPONENTS **/
import './assets/css/components/badge.css';
import './assets/css/components/buttons.css';
import './assets/css/components/input.css';

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
