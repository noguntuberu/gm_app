/** */
import { combineReducers } from 'redux';

import audiences from './reducers/audience';
import campaigns from './reducers/campaign';
import contacts from './reducers/contact';
import processes from './reducers/process';
import user_data from './reducers/user-data';

export default combineReducers({
    audiences,
    campaigns,
    contacts,
    processes,
    user_data,
});