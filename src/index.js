import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from 'containers/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
window.CURRENCY_RATE;

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
registerServiceWorker();
