import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import CancelReservation from './components/cancel_reservation';
import Error404 from './components/error_404';
import reducers from './reducers';
import newClientForm from './components/new_client_form';
import Root from './components/root';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={(props) => <App {...props}/>} />
        <Route path="cancelreservation" component={CancelReservation} />
        <Route path="form" component={newClientForm} />
        <Route path="*" component={Error404} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
