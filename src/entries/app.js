import React, {Fragment} from 'react';
import { render } from 'react-dom';
import Videos from '../pages/containers/videos';
import Home from '../pages/components/home';
import Contact from '../pages/components/contact';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../pages/components/header';
// function logger({ getState, dispatch}) {
//   return (next) => {
//     return (action) => {
//       console.log('este es mi viejo estado', getState().toJS())
//       console.log('vamos a enviar está acción', action);
//       const value = next(action)
//       console.log('este es mi nuevo estado', getState().toJS())
//       return value
//     }
//   }
// }


const logger_ = ({getState, dispatch }) => next => action => {
  console.log('este es mi viejo estado', getState().toJS())
  console.log('vamos a enviar está acción', action);
  const value = next(action)
  console.log('este es mi nuevo estado', getState().toJS())
  return value
}

const store = createStore(
  reducer,
  map(),
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk
    )
  )
);


const homeContainer = document.getElementById('home-container')


render(
  <BrowserRouter
    // basename = "/videos"
  >
    <Provider store={store}>
    <Fragment>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/videos" component={Videos} />
      <Route path="/contact" component={Contact} />
      {/* <Home /> */}
    </Fragment>
    </Provider>  
  </BrowserRouter>
, homeContainer);

