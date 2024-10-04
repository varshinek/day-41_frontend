import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider} from 'react-redux'
import store from './Store/Storeindex'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
    <App />
  </Provider>
);

reportWebVitals();
