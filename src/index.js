import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {   Provider } from 'react-redux'
import { BrowserRouter , Router } from 'react-router-dom';
// import $ from 'jquery';
// import Popper from 'popper.js';
import store from './components/Redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'

import {history} from './components/Helpers/history'
ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>

    
          {/* <BrowserRouter>
        <App />
        </BrowserRouter>   */}
         <Router history={history}>
          <App/>
        </Router> 
    </Provider>  ,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
