/** */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import site_name from '../../assets/icons/site-name/site-name-bg-white.svg';

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
        <div className="guest-area-wrapper flex-col-center h-100">
            <div className="flex-row-center">
                <div className="mobi-site-name" onClick={() => history.push('/')}>
                    <img src={site_name} alt="Site Name" />
                </div>
            </div>
            <div className="guest-form-wrap">
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