import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import { history } from "./history";
import {render} from 'react-dom';
import App from './components/App';
import Blocks from './components/Blocks';
import './index.css';

render(
    <Router history ={history}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/blocks" component={Blocks}/>
        </Switch>
    </Router>,
    document.getElementById('root')
)