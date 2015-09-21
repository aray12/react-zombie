/**
 * Created by alexanderray on 9/2/15.
 */

'use strict';

import BaseStore from '../core/BaseStore';
import ActionTypes from '../constants/ActionTypes';
import Defaults from '../constants/Defaults';

class AccountStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(this._registerActions.bind(this));
        this._account = {};
        this._loggedIn = false;
    }

    get account() {
        return this._account;
    }

    get isLoggedIn() {
        return this._loggedIn;
    }

    _login(res) {
        localStorage.setItem(Defaults.JWT_TOKEN, res.token);
        this._loggedIn = true;
        this._account = res.account;

    }

    _logout() {
        this._loggedIn = false;
    }

    _registerActions(action) {
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