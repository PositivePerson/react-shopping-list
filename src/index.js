import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// import '@material/react-list/index.scss';

import "@material/react-list/dist/list.css";
import "@material/react-menu-surface/dist/menu-surface.css";
import "@material/react-menu/dist/menu.css";
import "@material/react-select/dist/select.css";
import '@material/react-list/dist/list.css';

import App from './components/App';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
