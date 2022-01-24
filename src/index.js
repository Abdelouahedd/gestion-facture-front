import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.css'


if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  console.log(process.env.REACT_APP_ENVIRONMENT)
  console.log = function () {};
}

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

