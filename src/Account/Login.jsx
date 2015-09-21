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
            email: '',
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
        // TODO : load proper content
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
        return (
            <form onSubmit={this._handleSubmit}>
                <input type="text" placeholder="Email" value={this.state.email}
                       onChange={this._handleChange.bind(this, 'email')}/>
                <input type="password" placeholder="Password" value={this.state.password}
                       onChange={this._handleChange.bind(this, 'password')}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
});

export default Login;
