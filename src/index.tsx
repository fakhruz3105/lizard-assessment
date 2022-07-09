import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This file can be ignored, please work in src/components/App.jsx
 */

// Include mock API.
import 'src/mock/index';

// Include styles.
import 'src/styles/index.scss';

// Include application component.
import App from 'src/components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
