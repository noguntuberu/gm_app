import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { Switch, Route, useHistory } from 'react-router-dom';

import APIIntegration from './api/api';
import WebsiteIntegration from './website/website';

const SettingsModule = props => {
    let dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch(setPageTitle('Integrations'));
    }, [dispatch]);

    return <div>
        <div className="settings-wrapper">
            <header>
                <div>
                    
                </div>
                <select onChange={e => history.push(e.target.value)} >
                    <option value="/integrations/api">API</option>
                    <option value="/integrations/web">Website</option>
                </select>
            </header>
            <section className="settings-content-wrapper">
                <Switch>
                    <Route path="/integrations/api" component={APIIntegration} />
                    <Route path="/integrations/web" component={WebsiteIntegration} />
                    <Route path="/" component={APIIntegration} />
                </Switch>
            </section>
        </div>
    </div>
}

export default SettingsModule;