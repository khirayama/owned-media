import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { reducer } from './reducers';
import { Routes } from './presentations/routes/Routes';
import { ResetStyle } from './presentations/styles/ResetStyle';
import { GlobalStyle } from './presentations/styles/GlobalStyle';
import { Intl } from './containers/Intl';

function extractInitialState() {
  const initialDataElement = window.document.querySelector('#initial-data');
  if (initialDataElement) {
    const initialDataString = initialDataElement.getAttribute('data-json');
    if (initialDataString) {
      return JSON.parse(initialDataString);
    } else {
      return {
        count: 0,
      };
    }
  }
}

const store = createStore(reducer, extractInitialState(), applyMiddleware(reduxThunk));

window.addEventListener('DOMContentLoaded', () => {
  const state = store.getState();

  ReactDOM.hydrate(
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <Provider store={store}>
        <Intl>
          <Routes baseUrl={state.settings.baseUrl} />
        </Intl>
      </Provider>
    </BrowserRouter>,
    window.document.querySelector('#root'),
  );
});
