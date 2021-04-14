import React, { useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import { Switch, Route, Redirect } from 'react-router-dom';

import APIIntegration from './api/api';
import SlidingNav from '../../shared/nav/sliding/sliding';

const SettingsModule = () => {
    let dispatch = useDispatch();

    let nav_items = [{
        title: 'API',
        path: '/settings'
    }];

    useEffect(() => {
        dispatch(setPageTitle('Settings'));
    }, [dispatch]);

    return <div>
        <header>
            <SlidingNav nav_items={nav_items} />
        </header>
        <section className="content-wrapper mt-3">
            <Switch>
                <Route path="/settings/api" component={APIIntegration} />
                <Redirect from="/**" to="/settings/api" />
            </Switch>
        </section>
    </div>
}

export default SettingsModule;