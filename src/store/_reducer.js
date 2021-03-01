/** */
import { combineReducers } from 'redux';

import audiences from './reducers/audience';
import campaigns from './reducers/campaign';
import contacts from './reducers/contact';
import header from './reducers/header';
import metadata from './reducers/metadata';
import plans from './reducers/plan';
import processes from './reducers/process';
import user_data from './reducers/user-data';
import { LOGOUT } from './actions/user-data';

const appReducer = combineReducers({
    audiences,
    campaigns,
    contacts,
    header,
    metadata,
    plans,
    processes,
    user_data,
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;