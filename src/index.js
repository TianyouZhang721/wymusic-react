import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 配置路由
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import "./util/fontsize"
import MapRoute from './routes/MapRoute'
import routes from './routes/routes'
import './style/index.styl'
Component.prototype.$http = axios
ReactDOM.render(
    <BrowserRouter>
        <MapRoute routes={routes} />
    </BrowserRouter>
,
  document.getElementById('root')
);

