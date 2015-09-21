/**
 * Created by alexanderray on 9/2/15.
 */

'use strict';

import request from 'superagent';

let API_URL = '/api';
let AUTH_URL = '/auth';
let TIMEOUT = 1000;
let _pendingRequests = [];

function getJwt() {
    return 'Bearer ' + localStorage.getItem('jwt');
}

function addRequest(key, pendingRequest) {
    _pendingRequests[key] = pendingRequest;
}

function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function () {};
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

function digest(resolve, reject) {
    return function(err, res) {
        if (err && err.timeout === TIMEOUT) {
            console.warn('Request timed out');
            // TODO : implement timeout warning component
            //dispatch(key, SkillConstants.request.TIMEOUT, params);
        } else if (res.status === 401) {
            console.log('Logging out');
            reject(err);
            // TODO : Log user out
            // UserActions.logout();
        } else if (!res.ok) {
            console.error(res);
            reject(res);
        } else {
            if (err) {
                console.warn(err);
                reject(err);
            } else {
                resolve(res);
            }
        }
    };
}

export function auth(actionType, data) {
    abortPendingRequests(actionType);
    // TODO : add request to pending addRequest()
    let promise = new Promise((resolve, reject) => {
        request
            .post(AUTH_URL)
            .send(data)
            .timeout(TIMEOUT)
            .end(digest(resolve, reject));
    });

    return promise;

}

export function get(actionType, resource, data, query) {
    abortPendingRequests(actionType);
    let promise = new Promise((resolve, reject) => {
        request
            .get(API_URL + resource)
            .set('Authorization', getJwt())
            .timeout(TIMEOUT)
            .end(digest);
    });
}

