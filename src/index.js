import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import store from './store/store'
import { Provider } from 'react-redux'

import {
    BrowserView,
    MobileView
  } from "react-device-detect";

ReactDOM.render(
    <Provider store={store}>
        <MobileView>
            <div className="valign-wrapper absolute">
            <div className="valign-inner">
                <h1>WHO's<br />WHO?</h1>
                <h3>Ce site n'est pas optimisé pour mobile</h3>
                <h4>Bisou...</h4>
            </div>
            </div>
        </MobileView>
        <BrowserView>
            <App />
        </BrowserView>
    </Provider>, document.getElementById('root')
);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
