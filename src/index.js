import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from 'containers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

window.CURRENCY_RATE;

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
registerServiceWorker();
