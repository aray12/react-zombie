/**
 * Created by alexanderray on 9/3/15.
 */

'use strict';

import AppDispatcher from '../core/AppDispatcher';

import ActionTypes from '../constants/ActionTypes';

import { auth } from '../core/HttpClient';

export function login(user) {
    AppDispatcher.handleAsyncAction(
        auth(ActionTypes.LOGIN, user),
        {
            request: ActionTypes.LOGIN,
            success: ActionTypes.LOGIN_SUCCESS,
            failure: ActionTypes.LOGIN_FAILED
        }
    );
}
