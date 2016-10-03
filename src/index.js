import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app';
import CancelReservation from './components/cancel_reservation';
import Error404 from './components/error_404';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="peruaikasi" component={CancelReservation} />
      <Route path="*" component={Error404} />
    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
