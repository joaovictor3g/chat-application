import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Join from './pages/Join';
import Chat from './pages/Chat';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Join} />
                <Route path="/chat" component={Chat} />
            </Switch>
        </BrowserRouter>
    );
};
