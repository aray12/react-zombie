/**
 * Created by alexanderray on 9/2/15.
 */

'use strict';

import BaseStore from '../core/BaseStore';
import ActionTypes from '../constants/ActionTypes';
import constants from '../constants/Defaults';

class AccountStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(this._registerActions.bind(this));
        this._profile;
        this._loggedIn = false;
    }

    get profile() {
        return this._profile;
    }

    get isLoggedIn() {
        return this._loggedIn;
    }

    _login(res) {
        localStorage.setItem(constants.JWT_TOKEN, res.body.token);
        this._loggedIn = true;
        this._profile = res.body.profile;

    }

    _logout() {
        this._loggedIn = false;
    }

    _registerActions(action) {
        console.log(action);
        switch(action.type) {
            case ActionTypes.LOGIN_SUCCESS:
                this._login(action.response);
                this.emitChange();
                break;

            case ActionTypes.LOGOUT:
                this._logout();
                this.emitChange();
                break;

            default:
                break;
        }
    }
}

export default new AccountStore();