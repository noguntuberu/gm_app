import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { NavLink, Switch, Route } from 'react-router-dom';

import './integrations.css';
import APIIntegration from './api/api';

const SettingsModule = props => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Integrations'));
    }, []);

    return <div>
        <div className="integrations-wrapper">
            <header>
                <NavLink to="/integrations/api"><span>API</span></NavLink>
                {/* <NavLink to="/integrations/api"><span>Email</span></NavLink> */}
                {/* <NavLink to="/integrations/api"><span>Facebook</span></NavLink> */}
                {/* <NavLink to="/integrations/api"><span>Twitter</span></NavLink> */}
            </header>
            <section className="integrations-content-wrapper">
                <Switch>
                    <Route path="/integrations/api" component={APIIntegration} />
                    <Route path="/" component={APIIntegration} />
                </Switch>
            </section>
        </div>
    </div>
}

export default SettingsModule;