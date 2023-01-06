import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import setupInterceptors from './services/utilsService/setupInterceptors';

import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={ store }>
			<App />
		</Provider>
  </BrowserRouter>,
);

setupInterceptors(store);