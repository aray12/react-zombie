/**
 * Created by alexanderray on 9/2/15.
 */

'use strict';

import { Dispatcher } from 'flux';

import ActionTypes from '../constants/ActionTypes';

class AppDispatcher extends Dispatcher {
    constructor () {
        super();
    }

    handleAction (type, action = {}) {
        if (!type) {
            throw new Error('You forgot to specify type');
        }

        if (process.env.NODE_ENV !== 'production' ) {
            if(action.error) {
                console.error(type, action);
            } else {
                console.log(type, action);
            }
        }

        this.dispatch({type, ...action});

        if(action.error && action.error.status && action.error.status === 401) {
            this.dispatch({type: ActionTypes.LOGOUT});
        }
    }

    handleAsyncAction (promise, types, action = {}) {
        const { request, success, failure } = types;

        this.handleAction(request, action);
        promise.then(
                response => this.handleAction(success, {...action, response}),
                error => this.handleAction(failure, {...action, error})
        );
    }
}

export default new AppDispatcher();
