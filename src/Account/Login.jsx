/**
 * Created by alexanderray on 9/3/15.
 */

'use strict';

import React from 'react';

import AccountStore from './AccountStore';

import * as AccountActions from './AccountActions';

const Login = React.createClass({
    getInitialState() {
        return {
            username: '',
            password: ''
        }
    },

    componentDidMount() {
        AccountStore.addChangeListener(this.init);
    },

    componentWillUnmount() {
        AccountStore.removeChangeListener(this.init);
    },

    init() {
        let nextState = this.state;

        let profile = AccountStore.profile;

        nextState['username'] = profile.username;

        this.setState(nextState);
    },

    _handleChange(field, e) {
        var nextState = this.state;

        nextState[field] = e.target.value;

        this.setState(nextState);
    },

    _handleSubmit(e) {
        e.preventDefault();

        AccountActions.login(this.state);
    },

    render() {
        if(AccountStore.isLoggedIn) {
            return (
                <div>
                    Congrats!! You are logged in as {this.state.username}
                </div>
            )
        } else {
            return (
                <form onSubmit={this._handleSubmit}>
                    <input type="text" placeholder="Email" value={this.state.username}
                           onChange={this._handleChange.bind(this, 'username')}/>
                    <input type="password" placeholder="Password" value={this.state.password}
                           onChange={this._handleChange.bind(this, 'password')}/>
                    <input type="submit" value="Submit"/>
                </form>
            );
        }
    }
});

export default Login;
