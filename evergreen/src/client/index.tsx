import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './reducers';
import { Routes } from './presentations/routes/Routes';
import { ResetStyle } from './presentations/styles/ResetStyle';
import { GlobalStyle } from './presentations/styles/GlobalStyle';

function extractInitialState() {
  const initialDataElement = window.document.querySelector('#initial-data');
  if (initialDataElement) {
    const initialDataString = initialDataElement.getAttribute('data-json');
    if (initialDataString) {
      return JSON.parse(initialDataString);
    }
  }
}

const store = createStore(reducer, extractInitialState(), composeWithDevTools(applyMiddleware(reduxThunk)));

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>,
    window.document.querySelector('#root'),
  );
});
