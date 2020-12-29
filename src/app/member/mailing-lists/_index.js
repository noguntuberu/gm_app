import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EditMailingList from './edit';
import ListMailingList from './list/list';
import ViewMailingList from './view';

const MailingListModule = () => {
    return (
        <Switch>
            <Route path="/mailing-lists/edit" component={EditMailingList} />
            <Route path="/mailing-lists/view" component={ViewMailingList} />
            <Route path="/mailing-lists" component={ListMailingList} />
        </Switch>
    )
}

export default MailingListModule;