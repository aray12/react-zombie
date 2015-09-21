/**
 * Created by alexanderray on 9/2/15.
 */

'use strict';

import { EventEmitter } from 'events';
import AppDispatcher from './AppDispatcher';

let CHANGE_EVENT = 'CHANGE';

export default class BaseStore extends EventEmitter {
    constructor() {
        super();
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe);
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    emitChange() {
        console.log('Change Emitted');
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        console.log('Change Listener Added');
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        console.log('Change Listener Removed');
        this.removeListener(callback);
    }
}