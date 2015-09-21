'use strict';

import React from 'react';
import {Route, Redirect, DefaultRoute} from 'react-router';

// Page Components
import Login from './pages/LoginPage.jsx';


var AppRoutes = (
    <Route name="root" path="/">
        <Route name="login" handler={Login} />

        <DefaultRoute handler={Login} />
    </Route>
);

module.exports = AppRoutes;
