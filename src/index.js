import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider as ReduxProvider } from 'react-redux';
import createStore from './store';
import App from './App';

const store = createStore(window.REDUX_DATA);

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);

registerServiceWorker();
