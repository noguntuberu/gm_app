import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { NavLink, Switch, Route } from 'react-router-dom';

import './settings.css';
import APISetting from './api/api';
import ProfileSetting from './profile/profile';
import SecuritySetting from './security/security';

const SettingsModule = props => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Settings'));
    }, []);

    return <div>
        <div className="settings-wrapper">
            <header>
                <ul>
                    <NavLink to="/settings/profile"><li>Profile</li></NavLink>
                    <NavLink to="/settings/security"><li>Security</li></NavLink>
                    <NavLink to="/settings/developer"><li>Developer</li></NavLink>
                </ul>
            </header>
            <section className="settings-content-wrapper">
                <Switch>
                    <Route path="/settings/developer" component={APISetting} />
                    <Route path="/settings/profile" component={ProfileSetting} />
                    <Route path="/settings/security" component={SecuritySetting} />
                    <Route path="/" component={ProfileSetting} />
                </Switch>
            </section>
        </div>
    </div>
}

export default SettingsModule;