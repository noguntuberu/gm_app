import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateContact from './create/create';
import EditContact from './edit/edit';
import ListContact from './list/list';

const ContactModule = () => {
    return (
        <Switch>
            <Route path="/contacts/new" component={CreateContact} />
            <Route path="/contacts/:id" component={EditContact} />
            <Route path="/contacts" component={ListContact} />
        </Switch>
    )
}

export default ContactModule;