import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {useStrict} from 'mobx'
import {Provider} from 'mobx-react'
import stores from './stores'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
    <Provider {...stores}>
        <Router basename="/">
            <App/>
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
