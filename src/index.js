import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.querySelector('#root'));

//want to make sure map api is loaded before proceeding
window.makeSureMapIsLoaded = ()=> {
  root.render(
    <Provider store={ store }>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
}
