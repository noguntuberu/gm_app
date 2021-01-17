/** */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as site_icon from '../../assets/images/site-name-web.fw.png'; 

/** */
import AccountActivation from './activation/activation';
import LoginForm from './login/login';
import PasswordRecovery from './password/recovery';
import PasswordReset from './password/reset';
import SignupForm from './signup/signup';

/** */
import './guest.css';

const GuestArea = () => {
    const history = useHistory();
    return (
        <div className="full-page-wrap d-flex flex-column justify-content-center align-items-center">

            <div className="guest-site-icon is-clickable" onClick={() => history.push('/')}>
                <img src={site_icon} alt="Site Icon" />
            </div>
            <div className="guest-form-wrap card pl-3 pr-3 pt-2 shadow">
                <Switch>
                    <Route path='/login' component={LoginForm} />
                    <Route path='/activation/:id' component={AccountActivation} />
                    <Route path='/password/recovery/' component={PasswordRecovery} />
                    <Route path='/password/reset/:id' component={PasswordReset} />
                    <Route path='/' component={SignupForm} />
                </Switch>
            </div>
        </div>
    )
}

export default GuestArea;