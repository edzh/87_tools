import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';
import { Provider } from 'react-redux';
import { store } from './client/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
