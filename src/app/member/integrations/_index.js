import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { Switch, Route, Redirect } from 'react-router-dom';

import SlidingNav from '../../shared/sliding-nav/sliding-nav';
import APIIntegration from './api/api';
import WebsiteIntegration from './website/website';

const SettingsModule = props => {
    let dispatch = useDispatch();

    let nav_items = [{
        title: 'API',
        path: '/integrations/api'
    }, {
        title: 'Website',
        path: '/integrations/web'
    }];

    useEffect(() => {
        dispatch(setPageTitle('Integrations'));
    }, [dispatch]);

    return <div>
        <header>
            <SlidingNav nav_items={nav_items} />
        </header>
        <section className="content-wrapper mt-3">
            <Switch>
                <Route path="/integrations/api" component={APIIntegration} />
                <Route path="/integrations/web" component={WebsiteIntegration} />
                <Redirect from="/**" to="/integrations/api" />
            </Switch>
        </section>
    </div>
}

export default SettingsModule;