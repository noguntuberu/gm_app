import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListMailingList from './list/list';
import ViewMailingList from './view/view';

const MailingListModule = () => {
    return (
        <Switch>
            <Route path="/mailing-lists/:id" component={ViewMailingList} />
            <Route path="/mailing-lists" component={ListMailingList} />
        </Switch>
    )
}

export default MailingListModule;