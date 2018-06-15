import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from 'containers/AuthProvider';
window.CURRENCY_RATE;

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
registerServiceWorker();
