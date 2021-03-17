import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { NavLink, Switch, Route } from 'react-router-dom';

import './setting.css';
import APIIntegration from './api/api';

const SettingsModule = () => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Settings'));
    }, [dispatch]);

    return <div>
        <div className="setting-wrapper">
            <header>
                <NavLink to="/settings/api"><span>API</span></NavLink>
                {/* <NavLink to="/settings/api"><span>Basic</span></NavLink> */}
            </header>
            <section className="setting-content-wrapper">
                <Switch>
                    <Route path="/settings/api" component={APIIntegration} />
                    <Route path="/" component={APIIntegration} />
                </Switch>
            </section>
        </div>
    </div>
}

export default SettingsModule;