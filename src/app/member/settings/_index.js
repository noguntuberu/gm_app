import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { NavLink, Switch, Route, useHistory } from 'react-router-dom';

import APIIntegration from './api/api';

const SettingsModule = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch(setPageTitle('Settings'));
    }, [dispatch]);

    return <div>
        <div className="settings-wrapper">
            <header>
                <select onChange={e => history.push(e.target.value)}>
                    <option value="/settings/api"> API Key
                        {/* <NavLink to="/settings/api"><span>API</span></NavLink> */}
                    </option>
                </select>
                {/* <NavLink to="/settings/api"><span>Basic</span></NavLink> */}
            </header>
            <section className="settings-content-wrapper">
                <Switch>
                    <Route path="/settings/api" component={APIIntegration} />
                    <Route path="/" component={APIIntegration} />
                </Switch>
            </section>
        </div>
    </div>
}

export default SettingsModule;